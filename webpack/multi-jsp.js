const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const Path = require("path");

const EntryData = require("./create-entry.js");

const JSPConfig = {
    // filename: "index.html",
    minify: {
        collapseWhitespace: true,
        keepClosingSlash: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
        minifyJS(text) {
            text = text.replace(/(\/\/){1}.+(\n){1}/g, "");
            text = text.replace(/(<!--){1}(.|\n)+(-->){1}/g, "");
            return text;
        },
    },
    // favicon: Path.join(__dirname, "../public/favicon.ico"),
    meta: {
        viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
        author: "Human visitors",
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
    publicPath: "<%=basePath%>assets",
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
                filename: "../" + arr.join("/"),
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
        cleanOnceBeforeBuildPatterns: [
            ...clearJsp,
            Path.join(__dirname, "../webapp/assets/**"),
        ], //指定删除文件夹
    })
);

module.exports = jspConfig;
