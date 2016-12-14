var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var registrosSchema = new Schema({
  cedula: { type: String },
  nombre: { type: String },
  preguntas:[
      {
        encabezado: { type: String },
        respuesta:  { type: String },
        estado: { type: Boolean }
      }
    ],
    positivas: { type: Number },
    negativas: { type: Number },
    noentiende: { type: Number }
});

module.exports = mongoose.model('Registros', registrosSchema);
