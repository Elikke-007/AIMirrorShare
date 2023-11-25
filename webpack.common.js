const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    index: "./src/index.js",
  },
  optimization: {
    // 有多个入口是需要配置此选项，否则会报错
    // runtimeChunk: 'single',

    // 去除重复的引用，比如A文件引入了lodash, B文件也引入了lodash
    // 默认情况下，这两个文件打包后的代码都包含了lodash的源代码，
    // 所以要加这个配置把 lodash 独立到一个文件中
    splitChunks: {
      chunks: "all",
    },
  },
  plugins: [
    // 用于输出 html 文件，自动引入 js 文件
    new HtmlWebpackPlugin({
      title: "AiMirror",
      template: "./index.html",
      favicon: path.resolve("./assets/logo.png"),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.less$/i, // 加载 less
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader",
          "less-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset", // asset/resource、asset/inline、asset/source、asset 四种类型
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024, // 图片小于4kb，就转成base64
          },
        },
      },
      {
        test: /\.js$/,
        use: ["babel-loader"],
      },
    ],
  },
};
