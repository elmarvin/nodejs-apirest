var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var methodOverride = require("method-override");
var app = express();
var aux = "";
// Connection to DB mongoose.connect(‘mongodb://userC7L:12345678@172.30.11.133:27017/clients’);
//mongoose.connect('mongodb://172.30.11.133:27017/clients', function(err, res) {
mongoose.connect('mongodb://userC7L:12345678@172.30.11.133:27017/clients', function(err, res) {
 if(err){
   console.log('No Connected to Database - mongodb://172.30.11.133:27017/clients');
   throw err;
 } else {
   console.log('Connected to Database - mongodb://172.30.11.133:27017/clients');
 }

});

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

// Import Models and Controllers
var models     = require('./models/client')(app, mongoose);
var ClientCtrl = require('./controllers/clients');

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

app.use('/api', api);


// Start server
//app.listen(3000, function() {
//  console.log("Node server running on http://localhost:3000");
//});

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '172.30.199.20';

app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);
