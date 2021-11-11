const {Schema, model} = require('mongoose');

const HistorialShema = Schema({
    RNCEmpresa: {
        type: String,
        required: [true, 'El RNC de la empresa es requerido']
    },
    CedulaCliente: {
        type: String,
        required: [true, 'La cédula es requerida']
    },    
    Concepto: {
        type: String,
        default: false
    },
    fecha: {
        type: String,
        default: false
    },
    montoadeudado: {
        type: String,
        default: false
    },
});

HistorialShema.methods.toJSON = function() {
    const {__v,_id, ...historial} = this.toObject();
    historial.uid = _id;

    return historial;
}

module.exports = model('HistorialCredito', HistorialShema,'HistorialCredito');