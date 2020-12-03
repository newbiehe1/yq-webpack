const fs = require("fs");
const path = require("path");

// // 读取文件
// (function (path) {
//     const files = fs.readFileSync(path);
//     console.log(files);
// })(path.join(__dirname, "../webapp/"));
fs.readdir("../webapp/", (res) => {
    console.log(res);
});
