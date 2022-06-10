const mysql = require('mysql');


const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'gestorcobranza'
});

mysqlConnection.connect(function (err){
    if(err){
        console.log(err)
    }else{
        console.log('Conexión exitosa');
    }
});

module.exports = mysqlConnection;
