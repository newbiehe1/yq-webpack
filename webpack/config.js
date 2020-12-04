const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const jspPlugin = require("./multi-jsp.js");

const plugins = [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin({
        cleanStaleWebpackAssets: false,
    }),
    new webpack.ProgressPlugin({
        handler(val, msg, module) {
            console.clear();
            console.log(`${msg} ${(val * 100).toFixed(2)}% ${module}`);
        },
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
                            name: "img/[name].[hash:5].[ext]",
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
                options: {
                    publicPath: (resourcePath, context) => {
                        return (
                            path.relative(path.dirname(resourcePath), context) +
                            "/css/"
                        );
                    },
                },
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
                            name: "fonts/[name].[hash:5].[ext]",
                        },
                    },
                },
            },
        ],
    },
];
const resolve = {
    // mainFields: ["node_modules"],
    extensions: [".vue", ".js", ".json"],
    alias: {
        "@": path.join(__dirname, "src"),
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
};