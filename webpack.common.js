const HtmlWebpackPlugin = require("html-webpack-plugin")
const path = require("path")

module.exports = {
  mode: "development",
  entry: {
    index: "./src/index.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
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
      template: "./index.html",
    }),
  ],
  module: {
    rules: [
      // 加载 less
      {
        test: /\.less$/i,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      // 加载图片
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        // generator: {
        //   filename: "image/[hash][ext][query]",
        // },
      },
    ],
  },
}
