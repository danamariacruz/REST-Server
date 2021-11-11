const {Schema, model} = require('mongoose');

const UsersShema = Schema({
    Nombre: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    Apellido: {
        type: String,
        required: [true, 'El apellido es requerido'],
        unique: true
    },
    Cedula: {
        type: String,
        required: [true, 'a cédula es requerida']
    },    
    Indicador: {
        type: String,
        default: false
    },
    Comentario: {
        type: String,
        default: false
    },
    MontoAudeudado: {
        type: String,
        default: false
    },
});

UsersShema.methods.toJSON = function() {
    const {__v,_id, ...user} = this.toObject();
    user.uid = _id;

    return user;
}

module.exports = model('Users', UsersShema,'Users');