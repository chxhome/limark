const path=require("path");
const fs=require("fs");
//const glob=require("glob");
const webpack=require("webpack");
//const UglifyPlugin=require("uglifyjs-webpack-plugin");
const HtmlPlugin=require("Html-webpack-plugin");
//const ExtractTextPlugin=require("extract-text-webpack-plugin");
//const PurifycssPlugin=require("purifycss-webpack");
const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('development'),
  __DEV__: true,
  'webpack.MODE': JSON.stringify('debug')
};
const publicPath='/';
module.exports = {
  mode:"development",
  entry: [
    './src/app.js'
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
    publicPath: publicPath
  },
  module: {
    rules: [{
      test:/\.css?$/,
      include: [
        path.resolve(__dirname, './src/styles/lib'),
        fs.realpathSync(__dirname + '/node_modules/antd')
      ],
      use:[{loader:"style-loader"}, {loader:"css-loader"}]//sass打包在js文件里
    },{
      test:/\.scss/i,
      use:[{loader:"style-loader"}, {loader:"css-loader"}, {loader:"sass-loader"}],//sass打包在js文件里
    },{
      test:/\.(jsx|js)$/i,
      include:[path.resolve(__dirname, 'src')],
      use:[{
        loader:"babel-loader"
        //options:{presets:["es2015","react"]}//这些配置都移到.babelrc
      }],
      exclude:/node_modules/  //这里如果加上引号会有错误提示:as it exceeds the max of "500KB"
    }],
  },
  plugins:[
    //new UglifyPlugin(),//开发环境下 运行wevpack-dev-server时，不能引入此插件
    new HtmlPlugin({
      //minify:{removeAttributeQuotes:true},//去掉HTML里的引号
      //hash:true,//引入JS路径后加HASH避免缓存
      template:"./src/index.html"
    }),
    new webpack.DefinePlugin(GLOBALS), 
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),//可以保证出错时页面不阻塞，且会在编译结束后报错
    new webpack.BannerPlugin('chx')//打包后的版权声明
  ],
  devServer:{
    publicPath: publicPath,
    contentBase:path.resolve(__dirname,"build"),//服务器在哪个目录获取静态资源发送给浏览器客户端
    host:'127.0.0.1',
    compress:false,
    port:8181,
    inline:true,
    hot:true
  }
};