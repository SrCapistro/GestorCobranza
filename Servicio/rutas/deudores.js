const express = require('express');
const { createPool } = require('mysql');
const router = express.Router();
const mysqlConnection = require('../database/db');


//OBTENER TODOS LOS DEUDORES
router.get('/deudores', (req, res)=>{
    mysqlConnection.query('select * from deudor where estado = 1', (err, rows, fields) =>{
        if(!err){
            res.json(rows);
        }else{
            res.send(err)
        }
    });
});


//Obtener un solo deudor
router.get('/deudores/:idDeudor', (req, res)=>{
    var idDeudor = req.params.idDeudor;
    console.log(idDeudor);
    mysqlConnection.query('select deudor.*, cobrador.nombreCobrador'+ 
    ' from deudor join cobrador on deudor.idCobrador = cobrador.idCobrador and deudor.idDeudor = ?', [idDeudor], (err, rows, fields) =>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    })
})


//Registrar deudor
router.post('/deudores', (req, res)=>{
    const {nombreCompleto, numeroContacto, correo, cantidadDeuda, deudaActual, calle, colonia, codigoPostal, ciudad} = req.body;
    mysqlConnection.query('insert into deudor set nombreCompleto = ?, numeroContacto = ?,'+
    " correo = ?, cantidadDeuda = ?, estadoDeuda = 1, deudaActual = ?, idSucursal = 1, "+
    " calle = ?, colonia = ?, codigoPostal = ?, ciudad = ?, deudor.estado = 1",
    [nombreCompleto, numeroContacto, correo, cantidadDeuda, deudaActual, calle, colonia, codigoPostal, ciudad], (err, rows)=>{
        if(err) return console.log(err.message);
        res.send("Registro completado");
    })
})

//Actualizar deudor
router.put('/deudores/:idDeudor', (req, res)=>{
    const {idDeudor} = req.params;
    const{nombreCompleto, numeroContacto, correo, idCobrador, calle, colonia, codigoPostal, ciudad} = req.body;
    mysqlConnection.query('update deudor set nombreCompleto = ?, numeroContacto = ?,'+
    " correo = ?, idCobrador =?, calle = ?, colonia = ?, codigoPostal = ?, ciudad = ? where deudor.idDeudor = ?", 
    [nombreCompleto, numeroContacto, correo, idCobrador, calle, colonia, codigoPostal, ciudad, idDeudor], (err, rows)=>{
        if(err) return console.log(err.message);
        res.send("Actualización exitosa");
    })
})

//Eliminar deudor
router.delete('/deudores/:idDeudor', (req, res)=>{
    var idDeudor = parseInt(req.params.idDeudor);
    mysqlConnection.query('update deudor SET estado = 0 where idDeudor = ?', [idDeudor], (err, rows)=>{
        if(err) return res.send(err)
        res.send("Deudor eliminado");
    })
})

//Ver pagos
router.get('/deudores/:idDeudor/pagos', (req, res)=>{
    const {idDeudor} = req.params;
    mysqlConnection.query('select * from pago where idDeudor = ?',[idDeudor], (err, rows)=>{
        if(err) return console.log(err.message);
        res.json(rows);
    })
})


//Registrar pago
router.post('/deudores/:idDeudor/pagos', (req, res)=>{
    const idDeudor = parseInt(req.params.idDeudor);
    const monto = parseFloat(req.body.monto);
    mysqlConnection.query('insert into pago set monto = ?, fechaPago = (select CURRENT_TIMESTAMP()), idDeudor = ?', 
    [monto, idDeudor], (err, rows)=>{
        if(err) return console.log(err.message);
        if(registrarPago(monto, idDeudor) != 0){
            res.send("Pago realizado");
        }else{
            res.send(err);
        }

    })
})


//Calcular deuda actual
function registrarPago(monto, idDeudor){
    mysqlConnection.query("update deudor d set d.deudaActual = d.deudaActual  - ? where d.idDeudor = ?;", [monto, idDeudor], (err, rows)=>{
        if(err){
            return 0;
        }else{
            return rows;
        }
    })
}


module.exports = router;

