var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var methodOverride = require("method-override");
var app = express();
var aux = "";
// parse application/json
var bodyParser = require('body-parser')
app.use(bodyParser.json())

var mongodbUri = "mongodb://localhost:27017/clients";
//var mongoURL = "mongodb://usermlab:12345678@ds133438.mlab.com:33438/utpltest";
//var mongoURL = "mongodb://usermlab:12345678@ds133438.mlab.com:33438/utpltest";
// Connection to DB mongoose.connect(‘mongodb://userC7L:12345678@172.30.11.133:27017/clients’);
var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };

//var mongodbUri = 'mongodb://usermlab:12345678@ds133438.mlab.com:33438/utpltest';

mongoose.connect(mongodbUri, options);
var conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'connection error:'));

conn.once('open', function() {
  // Wait for the database connection to establish, then start the app.
  console.log("Conectado");
});
//mongoose.connect(mongoURL);
/**mongoose.connect('mongodb://admin:jglo1gGTv51lUxQH@172.30.11.133:27017/clients', function(err, res) {
 if(err){
   console.log('No Connected to Database');
   console.log(err);
   throw err;
 } else {
   console.log('Connected to Database');
 }

});**/

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

// Import Models and Controllers
var models     = require('./models/client')(app, mongoose);
var ClientCtrl = require('./controllers/clients');
var models     = require('./models/registros')(app, mongoose);
var RegistrosCtrl = require('./controllers/registros');

var router = express.Router();

// Index - Route
router.get('/', function(req, res) {
   res.send("Hola Mundo - www.programacion.com.py -"+aux);
});

app.use(router);

// API routes
var api = express.Router();

api.route('/clients')
  .get(ClientCtrl.findAll)
  .post(ClientCtrl.add);

api.route('/clients/:id')
  .get(ClientCtrl.findById)
  .put(ClientCtrl.update)
  .delete(ClientCtrl.delete);

api.route('/registros')
  .get(RegistrosCtrl.findAll)
  .post(RegistrosCtrl.add);

api.route('/registros/:id')
  .get(RegistrosCtrl.findById)
  .put(RegistrosCtrl.update)
  .delete(RegistrosCtrl.delete);

app.use('/api', api);


// Start server
//app.listen(3000, function() {
//  console.log("Node server running on http://localhost:3000");
//});

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);
