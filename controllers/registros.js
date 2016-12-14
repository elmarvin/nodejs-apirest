var mongoose = require('mongoose');
var Registros  = mongoose.model('Registros');

//GET - Return all registers
exports.findAll = function(req, res) {
	Registros.find(function(err, registros) {
    if(err) res.send(500, err.message);
  	console.log('GET /registros');
		res.status(200).jsonp(registros);
	});
};

//GET - Return a register with specified ID
exports.findById = function(req, res) {
	Registros.findById(req.params.id, function(err, registros) {
    if(err) return res.send(500, err.message);
    console.log('GET /registros/' + req.params.id);
		res.status(200).jsonp(registros);
	});
};

//POST - Insert a new register
exports.add = function(req, res) {
	console.log('POST');
	console.log(req.body);
	var registro = new Registros(req.body);
	registro.save(function(err, registros) {
		if(err) return res.send(500, err.message);
    	res.status(200).jsonp(registros);
	});
};

//PUT - Update a register already exists
exports.update = function(req, res) {
	Registros.findById(req.params.id, function(err, registros) {
		registros = new Registros(req.body);
		registros.save(function(err) {
			if(err) return res.send(500, err.message);
      		res.status(200).jsonp(registros);
		});
	});
};

//DELETE - Delete a register with specified ID
exports.delete = function(req, res) {
	Registros.findById(req.params.id, function(err, registros) {
		registros.remove(function(err) {
			if(err) return res.send(500, err.message);
      		res.json({ message: 'Successfully deleted' });
		});
	});
};
