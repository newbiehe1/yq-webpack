const HtmlWebpackPlugin = require("html-webpack-plugin");
const EnteryData = require("./create-entry.js");

const JSPConfig = {
    // filename: "index.html",
    minify: false,
    meta: {
        viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
        author: "world-vistor",
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
    // template: path.resolve(__dirname, "../public/index.html"),
};

let jspConfig = [];

for (let key in EnteryData.entry) {
    const arr = EnteryData.jspEntry[key].split("\\");
    const n = arr.findIndex((index) => {
        return index === "webapp";
    });
    arr.splice(0, n + 1);

    jspConfig.push(
        new HtmlWebpackPlugin(
            Object.assign({}, JSPConfig, {
                filename: arr.join("/"),
                template: EnteryData.jspEntry[key],
                chunks: [key],
            })
        )
    );
}
module.exports = jspConfig;
