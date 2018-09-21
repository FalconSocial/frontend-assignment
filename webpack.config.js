
module.exports = ({ config }) => ({
  dev: require('./webpack.dev.config'),
  prod: require('./webpack.prod.config')
}[config])
