const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.authPath = '/api/auth';
        this.usuariosPath = '/api/usuarios';
        this.tasaPath = '/api/OpenSource';

        this.conectarDB();

        this.middlewares();

        this.routes();
    }

    middlewares() {

        this.app.use(cors());

        //lectura y parseo del body
        this.app.use(express.json());

        this.app.use(express.static('public'));
    }

    async conectarDB() {
        await dbConnection();
    }

    routes() {
        this.app.use(this.authPath,require('../routes/auth'));
        this.app.use(this.usuariosPath,require('../routes/usuarios'));
        this.app.use(this.tasaPath,require('../routes/OpenSource'));
        
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(this.port)
          });
    }
}

module.exports = Server;