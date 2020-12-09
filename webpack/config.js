const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const webpack = require("webpack");

const jspPlugin = require("./multi-jsp.js");

const plugins = [
    new VueLoaderPlugin(),
    new webpack.ProgressPlugin({
        handler(val, msg, module) {
            console.clear();
            console.log(
                `${msg} ${(val * 100).toFixed(2)}% ${module ? module : ""}`
            );
        },
    }),
    new MiniCssExtractPlugin({
        filename: "css/[name]-[chunkhash:5].css",
        chunkFilename: "css/[id]-[chunkhash:5].css",
    }),
    ...jspPlugin,
];
const rules = [
    {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
            {
                loader: "url-loader",
                options: {
                    limit: 1000,
                    fallback: {
                        loader: "file-loader",
                        options: {
                            esModule: false,
                            name: "img/[name].[hash:5].[ext]",
                            // outputPath: (url, resourcePath, context) => {
                            //     console.log(url, resourcePath, context);
                            //     return "../" + url;
                            // },
                        },
                    },
                },
            },
        ],
    },
    {
        test: /\.(s?css|styl(us|e)?)$/i,
        use: [
            {
                loader: MiniCssExtractPlugin.loader,
            },
            {
                loader: "css-loader", // 将 CSS 转化成 CommonJS 模块
                options: {
                    import: true,
                },
            },
            {
                loader: "postcss-loader",
            },
            {
                loader: "sass-loader", // 将 Sass 编译成 CSS
            },
        ],
    },
    {
        test: /\.m?js$/,
        exclude: (file) => /node_modules/.test(file) && !/\.vue\.js/.test(file),
        use: {
            loader: "babel-loader",
        },
    },
    {
        test: /\.vue$/,
        loader: "vue-loader",
    },
    {
        test: /\.(woff|woff2|eot|ttf|otf)(\?\S*)?/i,
        use: [
            {
                loader: "url-loader",
                options: {
                    limit: 1000,
                    fallback: {
                        loader: "file-loader",
                        options: {
                            esModule: false,
                            name: "fonts/[name].[hash:5].[ext]",
                        },
                    },
                },
            },
        ],
    },
    {
        test: /\.jsp/,
        use: "raw-loader",
    },
];
const resolve = {
    // mainFields: ["node_modules"],
    extensions: [".vue", ".js", ".json"],
    alias: {
        "@": path.join(__dirname, "src/"),
    },
};

const optimization = {
    moduleIds: "named",
    mergeDuplicateChunks: true,
    splitChunks: {
        chunks: "all",
        automaticNameDelimiter: ".",
    },
    minimize: true,
    minimizer: [
        new CssMinimizerPlugin(),
        new TerserPlugin({
            extractComments: false,
            terserOptions: {
                compress: {
                    drop_console: true,
                },
            },
        }),
    ],
};

module.exports = {
    plugins: plugins,
    module: {
        rules: rules,
    },
    resolve: resolve,
    optimization: optimization,
    cache: false,
    performance: {
        maxEntrypointSize: 2097152,
        maxAssetSize: 2097152,
    },
};
