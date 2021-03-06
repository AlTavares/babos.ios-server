
var ParseServer = require('parse-server').ParseServer;
var port = process.env.PORT || 3000
var api = new ParseServer({
  databaseURI: process.env.MONGODB_URI,
  cloud: __dirname + '/cloud/main.js',
  appId: process.env.appId,
  masterKey: process.env.masterKey, //Add your master key here. Keep it secret!
  serverURL: 'http://localhost:' + port + '/parse'
  // liveQuery: {
  //   classNames: [] // List of classes to support for query subscriptions
  // }
});
// Client-keys like the javascript key or the .NET key are not necessary with parse-server
// If you wish you require them, you can set them as options in the initialization above:
// javascriptKey, restAPIKey, dotNetKey, clientKey

module.exports = api