const webpack = require("webpack");
let config = require("./config.js");
const entryData = require("./create-entry.js");
const path = require("path");
const { merge } = require("webpack-merge");
config = merge(config, {
    mode: "production",
    devtool: false, //仅个人测试是打开
    entry: entryData.entry,
    output: {
        filename: "js/[name]-[chunkhash:5].js",
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
        // const arr = stats.toJson();
        // const errs = [];
        // const warns = [];
        // let time = 0;
        // let v= '';
        // stats.toJson().forEach(index=>{
        //     time+= index.time;
        //     v = index.version;
        //     if(index.errors){
        //         errs.push(index)
        //     }
        //     if(index.warns){
        //         warns.push(index)
        //     }
        // })

        // const errs = arr.filter(index=>{
        //     return index.errors
        // });
        // const warns = arr.filter(index=>{
        //     return index.warnings
        // });

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
