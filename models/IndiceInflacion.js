const {Schema, model} = require('mongoose');

const IndiceShema = Schema({
    Anion: {
        type: Number,
        required: [true, 'El año es requerido']
    },
    Mes: {
        type: String,
        required: [true, 'El mes es requerido'],
        unique: true
    },
    IndiceInflacion: {
        type: String,
        required: [true, 'El indice de inflación es requerido']
    },    
    UltimaModificacion: {
        type: String,
        default: false
    },
});

IndiceShema.methods.toJSON = function() {
    const {__v,_id, ...indice} = this.toObject();
    indice.uid = _id;

    return indice;
}

module.exports = model('IndiceInflacion', IndiceShema,'IndiceInflacion');