const express = require('express');
const { createPool } = require('mysql');
const router = express.Router();
const mysqlConnection = require('../database/db');
const bcrypt = require("bcrypt");
const { json } = require('express');

var id;

//Login
router.post('/login', (req,res)=>{
    var usuario = req.body.usuario;
    var contraseña = req.body.contraseña;
    var tipo = req.body.tipo;
    if(tipo){
        mysqlConnection.query("select idUsuario from administrador where usuario = ? and contraseña = ?;", [usuario, contraseña], (err, rows)=>{
            if(err) return console.log(err);
            res.json(rows);
        })
    }else{
        mysqlConnection.query("select idCobrador, idSucursal from cobrador where usuario = ? and contraseña = ?;", [usuario, contraseña], (err, rows)=>{
            if(err) return console.log(err);
            res.json(rows);
        })
    }
})


module.exports = router;