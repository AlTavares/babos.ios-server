let build = require('mozilla-neo/config/webpack.prod');
let path = require('path');

build.eslint = {
  configFile: path.join(process.cwd(), 'client/.eslintrc.js')
};

module.exports = build;