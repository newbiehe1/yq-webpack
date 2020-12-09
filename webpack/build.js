const webpack = require("webpack");
let config = require("./config.js");
const entryData = require("./create-entry.js");
const path = require("path");
const { merge } = require("webpack-merge");
config = merge(config, {
    mode: "production",
    devtool: "nosources-source-map",
    entry: entryData.entry,
    output: {
        filename: "js/[name]-[chunkhash:5].js",
        publicPath: "../../",
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
        // console.log(stats);
        console.log(
            // stats.toJson()
            stats.toString({
                chunks: false, // 使构建过程更静默无输出
                colors: true, // 在控制台展示颜色
            })
        );
    }
});
