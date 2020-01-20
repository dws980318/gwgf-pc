const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  devServer: {
    // open: true, // 自动开启浏览器
    proxy: {
      '/': {
        target: 'http://192.168.0.175:8080',
        changeOrigin: true,
        // pathRewrite: {
        //   '^/': '/'   //需要rewrite重写的,
        // }
      }
    }
  },
  runtimeCompiler: true,
  productionSourceMap: false,
  publicPath: './',
  configureWebpack: config => {
    config.resolve = {
      extensions: ['.js', '.vue', '.json', ".css"],
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': resolve('src'),
      }
    };
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
    }
  },
}