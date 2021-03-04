const webpack = require("webpack");
let config = require("./config-test.js");
const entryData = require("./create-entry.js");
const path = require("path");
const { merge } = require("webpack-merge");
config = merge(config, {
    mode: "production",
    devtool: "eval-cheap-module-source-map", //仅个人测试是打开
    entry: entryData.entry,
    output: {
        filename: "js/[name].js",
        publicPath: "../",
        path: path.resolve(__dirname, "../webapp/assets/"),
    },
    // watch: true,
    // watchOptions: {
    //     ignored: /node_modules/,
    // },
});

webpack(config, (err, stats) => {
    if (err) {
        console.log(err.toString());
    } else {
        console.log(
            stats.toString({
                assetsSort: "!size",
                builtAt: false,
                moduleAssets: false,
                cached: false,
                cachedModules: false,
                runtimeModules: false,
                version: false,
                usedExports: false,
                timings: false,
                publicPath: false,
                outputPath: false,
                modules: false,
                modulesSort: "size",
                hash: false,
                colors: true,
                chunkGroups: false,
                entrypoints: false,
                assets: false,
            })
        );
    }
});
