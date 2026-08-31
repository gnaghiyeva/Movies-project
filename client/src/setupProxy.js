const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware({
      target: 'http://localhost:9595',
      changeOrigin: true,
      pathFilter: [
        '/api/**',
        '/images/**',
        '/videos/**',
        '/songs/**'
      ]
    })
  );
};