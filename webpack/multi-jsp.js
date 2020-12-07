const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const EntryData = require("./create-entry.js");

const JSPConfig = {
    // filename: "index.html",
    minify: false,
    meta: {
        viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
        author: "word-visitor",
        "utf-8": { charset: "utf-8" },
        "X-UA-Compatible": {
            "http-equiv": "X-UA-Compatible",
            content: "IE=edge,chrome=1",
        },
        Pragma: {
            "http-equiv": "Pragma",
            content: "no-cache",
        },
    },
};

let jspConfig = [];
let clearJsp = [];
for (let key in EntryData.entry) {
    const arr = EntryData.jspEntry[key].split("\\");
    const n = arr.findIndex((index) => {
        return index === "public";
    });
    arr.splice(0, n + 1);
    jspConfig.push(
        new HtmlWebpackPlugin(
            Object.assign({}, JSPConfig, {
                filename: arr.join("/"),
                template: EntryData.jspEntry[key],
                chunks: [key],
            })
        )
    );
    clearJsp.push(arr.join("/"));
}
jspConfig.push(
    new CleanWebpackPlugin({
        cleanStaleWebpackAssets: false,
        cleanOnceBeforeBuildPatterns: [...clearJsp, "js/*"], //指定删除文件夹
    })
);

module.exports = jspConfig;
