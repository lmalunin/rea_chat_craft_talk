const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
      '/api',
      createProxyMiddleware({
        target: 'https://chat-marketplace.beta.moex.com',
        changeOrigin: true,
        headers: {
          Connection: 'keep-alive',
        },
      }),
  );
};