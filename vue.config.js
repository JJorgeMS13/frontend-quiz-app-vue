const { defineConfig } = require('@vue/cli-service')
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/frontend-quiz-app-vue/' // Cambia 'nombre-del-repositorio' por el nombre de tu repositorio
    : '/'
};
