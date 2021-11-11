const jwt = require('jsonwebtoken');

const generarJWT = (uid = '') => {
    return new Promise( (resolver,reject) => {
        const payload = {uid};

        jwt.sign(payload,process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, (err,token) => {
            if (err) {
                reject(`No fue posible generar el token: ${err}`)
            } else {
                resolver(token);
            }
        })
    })
}

module.exports = generarJWT;