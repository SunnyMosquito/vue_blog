module.exports = {
  baseUrl: '/',
  devServer: {
    port: 8080, // 端口号
    host: "0.0.0.0",
    proxy: {
      '/api': {
        target: 'http://www.zengzhiwen.site/post/api',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}