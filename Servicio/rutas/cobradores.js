const express = require('express');
const { createPool } = require('mysql');
const router = express.Router();
const mysqlConnection = require('../database/db');
const bcrypt = require("bcrypt");

//Mostrar cobradores
router.get('/cobradores', (req, res)=>{
    mysqlConnection.query('select * from cobrador where estatus = 1', (err, rows, fields) =>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
})

//Mostrar cobrador por sucursal
router.get('/cobradores/sucursal/:idSucursal', (req, res)=>{
    const idSucursal = parseInt(req.params.idSucursal);
    mysqlConnection.query('select * from cobrador where idSucursal = ? and estatus = 1',[idSucursal], (err, rows, fields) =>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
})

//Cobrador
router.get('/cobradores/:idCobrador', (req, res)=>{
    var idCobrador = parseInt(req.params.idCobrador);
    mysqlConnection.query("select cobrador.*, sucursal.nombreSucursal from cobrador join sucursal on idCobrador = ? and sucursal.idSucursal = cobrador.idSucursal ;", [idCobrador], (err, rows)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    })
})



//Registrar cobrador
router.post('/cobradores', (req, res)=>{
    const{nombreCobrador, numeroContacto, correo, idSucursal, usuario, contraseña} = req.body;
    //var hashedPass = hashearContaseña(contraseña)
    mysqlConnection.query('insert into cobrador set nombreCobrador = ?, numeroContacto = ?,'+
    " correo = ?,  idSucursal = ?, usuario = ?, contraseña = ?, estatus = 1",
    [nombreCobrador, numeroContacto, correo, idSucursal, usuario, contraseña], (err, rows)=>{
        if(err) return res.send(err);
        res.send("Registro exitoso");
    })
})

//Actualizar cobrador
router.put('/cobradores/:idCobrador', (req, res)=>{
    const {idCobrador} = req.params;
    const{nombreCobrador, numeroContacto, correo, idSucursal} = req.body;
    mysqlConnection.query('update cobrador set nombreCobrador = ?, numeroContacto = ?,'+
    " correo = ?, idSucursal = ? where cobrador.idCobrador = ?", 
    [nombreCobrador, numeroContacto, correo, idSucursal, idCobrador], (err, rows)=>{
        if(err) return console.log(err.message);
        res.send("Actualización exitosa");
    })
})

//Cambiar contraseña
router.put('/cobradores/pass/:idCobrador', (req, res)=>{
    const idCobrador = parseInt(req.params.idCobrador);
    const contra = req.body.contra;
    mysqlConnection.query('update cobrador set contraseña = ? where cobrador.idCobrador = ?', 
    [contra, idCobrador], (err, rows)=>{
        if(err) return console.log(err.message);
        res.send("Contraseña cambiada correctamente");
    })
})


//Eliminar cobrador
router.delete('/cobradores', (req, res)=>{
    const idCobrador = parseInt(req.body.idCobrador);
    mysqlConnection.query('update cobrador set cobrador.estatus = 0 where idCobrador = ?', [idCobrador], (err, rows)=>{
        if(err) return console.log(err.message);
        res.send("Cobrador eliminado");
    })
})

//Obtener deudores de un cobrador
router.get('/cobradores/deudores/:idCobrador', (req, res)=>{
    var idCobrador = parseInt(req.params.idCobrador);
    mysqlConnection.query('select * from deudor where estado = 1 and idCobrador = ?',[idCobrador], (err, rows, fields) =>{
        if(!err){
            res.json(rows);
        }else{
            res.send(err)
        }
    });
});

//Obtener deudor asignado
router.get('/cobradores/deudores/:idCobrador/:idDeudor', (req, res)=>{
    var idCobrador = parseInt(req.params.idCobrador);
    var idDeudor = parseInt(req.params.idDeudor);
    mysqlConnection.query('select * from deudor where estado = 1 and idCobrador = ? and idDeudor=?',[idCobrador, idDeudor], (err, rows, fields) =>{
        if(!err){
            res.json(rows);
        }else{
            res.send(err)
        }
    });
});

function hashearContaseña(contraseña){
    const rondas = 10;
    var hash = bcrypt.hashSync(contraseña, rondas);
    return hash;
}

module.exports = router;