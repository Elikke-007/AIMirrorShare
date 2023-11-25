module.exports = {
  plugins: [
    // 包含了autoprefix-自动加上浏览器兼容前缀，
    // 对于十六进制颜色值#12345678，后面的78代表透明度，不是所有浏览器都支持，这个插件就可以将其转成rgba的格式
    "postcss-preset-env", //缩写，全拼是 require("postcss-preset-env"),
  ],
};
