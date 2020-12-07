const fs = require("fs");
const Path = require("path");

const paths = [];

// // 读取文件
(function findEntry(path) {
    const childFileData = fs.readdirSync(path);
    if (childFileData && Array.isArray(childFileData)) {
        childFileData.forEach((index) => {
            const newPath = Path.join(path, index);
            const fileData = fs.statSync(newPath);
            if (fileData && fileData.isFile()) {
                paths.push(newPath);
            } else if (fileData && fileData.isDirectory()) {
                findEntry(newPath);
            }
        });
    }
})(Path.join(__dirname, "../public/"));

module.exports = paths;
