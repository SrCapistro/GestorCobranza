const { Router } = require('express');
const express = require('express');
const { createPool } = require('mysql');
const router = express.Router();
const mysqlConnection = require('../database/db');


//Mostrar sucursales
router.get('/sucursales', (req, res)=>{
    mysqlConnection.query('select * from sucursal', (err, rows, fields) =>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
})

//Mostrar sucursal por id
router.get('/sucursales/:idSucursal', (req, res)=>{
    const idSucursal = parseInt(req.params.idSucursal)
    mysqlConnection.query('select * from sucursal where idSucursal  = ?',[idSucursal], (err, rows, fields) =>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
})

//Registrar sucursal
router.post('/sucursales', (req, res)=>{
    const{nombreSucursal, calle, colonia, codigoPostal, ciudad} = req.body;
    mysqlConnection.query("insert into sucursal set nombreSucursal = ?, calle = ?, colonia = ?, codigoPostal = ?, ciudad = ?",
    [nombreSucursal, calle, colonia, codigoPostal, ciudad], (err, rows)=>{
        if(err) return console.log(err.message);
        res.send("Registro exitoso");
    });
})

//Actualizar sucursal
router.put('/sucursales/:idSucursal', (req, res)=>{
    const {idSucursal} = req.params
    const{nombreSucursal, calle, colonia, codigoPostal, ciudad} = req.body;
    mysqlConnection.query("update sucursal set nombreSucursal = ?, calle = ?, colonia = ?, codigoPostal = ?, ciudad = ? where idSucursal = ?",
    [nombreSucursal, calle, colonia, codigoPostal, ciudad, idSucursal], (err, rows)=>{
        if(err) return console.log(err.message);
        res.send("Registro exitoso");
    });
})

//Eliminar sucursal
router.delete('/sucursales', (req, res)=>{
    const{idSucursal} = req.body;
    mysqlConnection.query("delete from sucursal where idSucursal = ?", [idSucursal], (err, rows)=>{
        if(err) return console.log(err.message);
        res.send(rows)
    })
})




module.exports = router;