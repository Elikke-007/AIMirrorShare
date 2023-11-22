const HtmlWebpackPlugin = require("html-webpack-plugin")
const path = require("path")

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
      template: "./index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.less$/i, // 加载 less
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.(jpg|png|gif)$/, // 处理图片资源
        loader: "url-loader", // 只有一个loader可以这样写
        options: {
          // 对loader进行配置
          limit: 8 * 1024, // 图片小于8kb，就转成base64
          esModules: false, // 因为url-loader默认用es6模块化语法去解析，而下面的html-loader引入的标签图片是commonjs规范，所以需要把url-loader关闭es6模块化语法，改用commonjs规范
          name: "[hash:10].[ext]", // 默认打包后的图片是个很长的哈希值，可以通过name进行重命名，例子是取前十位，文件格式为原格式
          outputPath: "imgs", // 意思是在输出的文件夹内新建个imgs文件夹，把打包后的图片资源放里面。
        },
      },
      // 因为光靠url-loader，并不能对html便签src引入的文件进行解析，所以需要通过html-loader解析html文件，引入便签对应的img，才能被url-loader处理
      {
        test: /\.html$/,
        loader: "html-loader",
      },
    ],
  },
}
