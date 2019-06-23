module.exports = {
  lintOnSave: false,
  devServer: {
    host: 'localhost',
    https: {
      key: '../backend/app/security/server.key',
      cert: '../backend/app/security/server.crt',
      ca: '../backend/app/security/rootCA.pem',
    },
  },
};
