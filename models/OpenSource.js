const {Schema, model} = require('mongoose');

const TasaShema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    CodigoMoneda: {
        type: String,
        required: [true, 'El codigo es requerido'],
        unique: true
    },
    PrecioActual: {
        type: Number,
        required: [true, 'El precio es requerido']
    },    
    estado: {
        type: Boolean,
        default: true
    },
    UltimaModificacion: {
        type: String,
        default: false
    },
});

TasaShema.methods.toJSON = function() {
    const {__v,_id, ...tasa} = this.toObject();
    tasa.uid = _id;

    return tasa;
}

module.exports = model('tasas', TasaShema);