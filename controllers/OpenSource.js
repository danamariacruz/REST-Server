const {response } = require('express');
const bcryptjs = require('bcryptjs');


const Tasa = require('../models/OpenSource');
const Indice = require('../models/IndiceInflacion');
const Users = require('../models/users');
const Historial = require('../models/HistorialCredito');
const Logs = require('../models/Logs');


const TasaGet = async(req, res = response) => {  
    const {CodigoMoneda} = req.params;
    const {_id, ...resto} = req.body;   

    const {PrecioActual} = await Tasa.findOne({CodigoMoneda : CodigoMoneda});

    const noServicio = 1;
    var {CantidadLlamada, ...logs} = await Logs.findOne({idServicio : noServicio});

    var acumulador = CantidadLlamada += 1;

    const actualizar = await Logs.updateOne({idServicio : noServicio},{CantidadLlamada: acumulador})

  res.json({
      PrecioActual,
  })
  }

const IndiceGet = async(req, res = response) => {  
    const {Anion,Mes} = req.query;
    const {_id, ...resto} = req.body;   

    const IndiceIfla = await Indice.findOne({Anion :Anion,Mes: Mes});

    const noServicio = 2;
    var {CantidadLlamada, ...logs} = await Logs.findOne({idServicio : noServicio});

    var acumulador = CantidadLlamada += 1;

    const actualizar = await Logs.updateOne({idServicio : noServicio},{CantidadLlamada: acumulador})

    if (IndiceIfla == null) {
        res.json({
            Mensaje : 'No se encuentra lo pedido'
        })
    } else {
        res.json({
            IndiceIfla
        })
    }

  
  }

const UserGet = async(req, res = response) => {  
    const {Cedula} = req.query;  

    const Usuario = await Users.findOne({Cedula: Cedula});

    const noServicio = 3;
    var {CantidadLlamada, ...logs} = await Logs.findOne({idServicio : noServicio});

    var acumulador = CantidadLlamada += 1;

    const actualizar = await Logs.updateOne({idServicio : noServicio},{CantidadLlamada: acumulador})

    if (Usuario == null) {
        res.json({
            Mensaje : 'No se encuentra lo solicitado'
        })
    } else {
        const {Indicador,Comentario,MontoAudeudado} = Usuario;
        res.json({
            Indicador,Comentario,MontoAudeudado
        })
    }

  
  }

const HistorialGet = async(req, res = response) => {  
    const {Cedula} = req.query;  

    const historialCred = await Historial.find({CedulaCliente: Cedula});

    const noServicio = 4;
    var {CantidadLlamada, ...logs} = await Logs.findOne({idServicio : noServicio});

    var acumulador = CantidadLlamada += 1;

    const actualizar = await Logs.updateOne({idServicio : noServicio},{CantidadLlamada: acumulador})

    if (historialCred == null) {
        res.json({
            Mensaje : 'No se encuentra lo solicitado'
        })
    } else {        
        res.json({
            historialCred
        })
    }

  
  }

const HistorialLogs = async(req, res = response) => {  
    const {fecha} = req.query;  

    const historialLogs = await Logs.find({fecha: fecha});

    if (historialLogs == null) {
        res.json({
            Mensaje : 'No se encuentra lo solicitado'
        })
    } else {        
        res.json({
            historialLogs
        })
    }

  
  }

  module.exports = {
    TasaGet,
    IndiceGet,
    UserGet,
    HistorialGet,
    HistorialLogs
}