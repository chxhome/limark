#plugins中加入 HtmlPlugin，并配置template，如：
```
new HtmlPlugin({
  minify:{removeAttributeQuotes:true},//去掉HTML里的引号
  hash:true,//引入JS路径后加HASH避免缓存
  template:"./src/index.html"
})
```
#plugins中加入 HotModuleReplacementPlugin 和NamedModulesPlugin
```
new webpack.HotModuleReplacementPlugin(),
new webpack.NamedModulesPlugin(),
```
#使output.publicPath与devServer.publicPath的值一样。
```
output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
    publicPath: publicPath
  },
  devServer:{
    publicPath: publicPath,
    contentBase:path.resolve(__dirname,"build"),//服务器在哪个目录获取静态资源发送给浏览器客户端
    host:'127.0.0.1',
    compress:false,
    port:8181,
    inline:true,
    hot:true
  },
```
#千万不要加入watchOptions配置，非常简单的代码学习可以用用，否则每次修改源码，重新编译会很慢
