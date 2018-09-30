const path=require("path");
const fs=require("fs");
//const glob=require("glob");
const webpack=require("webpack");
const HtmlPlugin=require("Html-webpack-plugin");
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
    './src/app.js',
    //因为使用browserSync,没有配置devServer，所以必须配置以下两项
    './tools/webpackPublicPath',//这里不加，会出现错误：__webpack_hmr 404 not found
    'webpack-hot-middleware/client?reload=true'//使用browser-sync，必须加上这个配置，否则不能热更新
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
    new HtmlPlugin({
      template:"./src/index.html"
    }),
    new webpack.DefinePlugin(GLOBALS), 
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),//可以保证出错时页面不阻塞，且会在编译结束后报错
    new webpack.BannerPlugin('chx')//打包后的版权声明
  ]
};