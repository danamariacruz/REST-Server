const {Schema, model} = require('mongoose');

const LogsShema = Schema({
    idServicio: {
        type: Number,
        required: [true, 'El id del servicio es requerido']
    },
    nombreServicio: {
        type: String,
        default : false
    },
    CantidadLlamada: {
        type: Number,
        default : false
    }, 
    fecha: {
        type: String,
        default: false
    },
});

LogsShema.methods.toJSON = function() {
    const {__v,_id, ...logs} = this.toObject();
    logs.uid = _id;

    return logs;
}

module.exports = model('LogsLlamada', LogsShema,'LogsLlamada');