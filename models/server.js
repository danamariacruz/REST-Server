const express = require('express')

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.middlewares();

        this.routes();
    }

    middlewares() {
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.get('/',  (req, res) => {
            res.json({
                msg: 'Esto es una peticion GET'
            })
          });

          this.app.put('/',  (req, res) => {
            res.json({
                msg: 'Esto es una peticion PUT'
            })
          });

          this.app.post('/',  (req, res) => {
            res.json({
                msg: 'Esto es una peticion POST'
            })
          });

          this.app.delete('/',  (req, res) => {
            res.json({
                msg: 'Esto es una peticion DELETE'
            })
          });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(this.port)
          });
    }
}

module.exports = Server;