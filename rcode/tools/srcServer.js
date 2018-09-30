import browserSync from 'browser-sync';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
//import proxy from 'http-proxy-middleware';
//import { config } from '../source/config';
import webpackConfig from '../webpack.config.bs';

const bundler = webpack(webpackConfig);
//const ajaxPrefix = config.ajaxPrefix;

const upcaseFirstChar = (name) => {
  if (!name || typeof name != 'string') {
    return '';
  }
  return name.replace(/^\w/, function (a) {
    return a.toUpperCase();
  });
};
// const apiProxy = proxy(ajaxPrefix, {
//   target: 'http://localhost:8008', // nei 默认使用8002端口
//   changeOrigin: true,
//   ws: true
// });
// 配置开发环境下的虚拟路径到物理路径的url path映射
const urlConfig = [
  {
    virtualPath: '/operation/',
    realPath: '/operation/index.html'
  }
];

// Run Browsersync and use middleware for Hot Module Replacement
browserSync({
  server: {
    baseDir: 'src'
  },
  middleware: [
    //apiProxy,
    webpackDevMiddleware(bundler, {
      // Dev middleware can't access config, so we provide publicPath
      publicPath: webpackConfig.output.publicPath,
      // pretty colored output
      stats: { colors: true },
      // Set to false to display a list of each file that is being bundled.
      noInfo: false,
      // for other settings see
      // http://webpack.github.io/docs/webpack-dev-middleware.html
    }),
    // bundler should be the same as above
    webpackHotMiddleware(bundler),
  ],

  // no need to watch '*.js' here, webpack will take care of it for us,
  // including full page reloads if HMR won't work
  files: [
    'src/*.html'
  ],
  open: false
});
