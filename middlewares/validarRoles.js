const {response } = require('express');

const esAdminRole = (req, res = response,next) => {
    if (!req.usuario) {
        return res.status(500).json({
            msq: 'Se quiere verificar el role primero que el token'
        });
    }
    const {rol,nombre} = req.usuario;
    if (rol != 'ADMIN_ROLE') {
        return res.status(401),json({
            msq: 'Este usuario no tiene permiso para eliminar registros'
        })
    }

    next();
}

module.exports = {
    esAdminRole
}