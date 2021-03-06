'use strict'
var ParseDashboard = require('parse-dashboard');
var port = process.env.PORT || 3000

let serverURL = 'http://localhost:' + port + '/parse'
if (process.env.NODE_ENV == 'production') {
  console.log('PROD dashboard')
  serverURL = 'https://babosio.herokuapp.com/parse'
}
var allowInsecureHTTP = true
var dashboard = new ParseDashboard({
  "apps": [
    {
      "serverURL": serverURL,
      "appId": process.env.appId,
      "masterKey": process.env.masterKey,
      "appName": "Babos.io"
    }
  ],
  "users": [
    {
      "user": process.env.username,
      "pass": process.env.password
    }
  ]
}, allowInsecureHTTP);

module.exports = dashboard