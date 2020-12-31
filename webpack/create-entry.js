const Path = require("path");
const JSPS = require("./find-entry.js");
const fs = require("fs");

const entryData = {
    entry: {},
    jspEntry: {},
};

// 获取版本
/*
 * zh_cn
 * zh_cn_ss
 *
 */

// 获取 路径中的 版本
function getVersion(path) {
    const paths = path.split("\\");
    const n = paths.findIndex((index) => {
        return index === "public";
    });
    return paths[n + 1];
}

// 获取路径中的文件名称(非文件夹)
function getFileName(path) {
    const paths = path.split("\\");
    return paths[paths.length - 1].split(".")[0];
}

// 去重
function deDuplication(arr) {
    return Array.from(new Set(arr));
}

JSPS.forEach((index) => {
    // 路径拆分 获取最后的文件名
    let name = getFileName(index);
    // 获取版本
    const version = getVersion(index);
    // 首字母变为小写
    let reg = /(^[A-Z])/;
    if (reg.test(name)) {
        name = name.replace(reg, RegExp.$1.toLocaleLowerCase());
    }

    // 匹配所有 _[a-z]和-[a-z]字符串
    reg = new RegExp("[_-][a-z]", "g");
    let regs = name.match(reg);

    if (regs && Array.isArray(regs)) {
        regs = deDuplication(regs);

        regs.forEach((item) => {
            reg = new RegExp(item, "g");
            let regAfterVal = "";
            if (/-/g.test(item)) {
                regAfterVal = item.split("-")[1].toLocaleUpperCase();
            } else if (/_/g.test(item)) {
                regAfterVal = item.split("_")[1].toLocaleUpperCase();
            }

            name = name.replace(reg, regAfterVal);
        });
    }
    createEntry(version + "/" + name, index);
});

// 创建入口
function createEntry(jsPath, jspPath) {
    let reg = new RegExp("[A-Z]", "g");
    let regs = jsPath.match(reg);
    let name = jsPath;
    if (regs && Array.isArray(regs)) {
        regs = deDuplication(regs);
        regs.forEach((item) => {
            reg = new RegExp(item, "g");
            name = name.replace(reg, "-" + item.toLocaleLowerCase());
        });
    }
    const path = Path.join(__dirname, "../src/entry/" + name + ".js");
    try {
        fs.accessSync(path);
    } catch (err) {
        fs.appendFile(path, "", (res) => {
            if (res) {
                console.log(path + "创建文件失败");
            }
        });
    }
    entryData.entry[name] = [
        Path.join(__dirname, "../src/entry/pro-env.js"),
        "@babel/polyfill",
        path,
    ];
    entryData.jspEntry[name] = jspPath;
}

module.exports = {
    ...entryData,
    getFileName,
    deDuplication,
    getVersion,
};
