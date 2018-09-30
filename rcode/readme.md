#webpack与extract-text-webpack-plugin版本冲突问题解决
提示错误：DeprecationWarning: Tapable.plugin is deprecated. Use new API on `.hooks` instead
解决方法：输入命令cnpm install extract-text-webpack-plugin@next
具体原因： https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/701
