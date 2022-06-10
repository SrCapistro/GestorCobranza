const URL_BASE = "http://localhost:3000/"

var tipoUsuario = localStorage.getItem('tipoUsuario');
var idSucursal = localStorage.getItem('idSucursal');
var idUsuario = localStorage.getItem('idUsuario');

function validarCobrador(){
    if(localStorage.getItem('tipoUsuario') != "cobrador"){
        document.location.href = "../index.html";
    }
}


function cargarDeudores(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(this.response);
        mostrarDeudores(data);
    }
    };
    xhttp.open("GET", URL_BASE+"cobradores/deudores/"+idUsuario, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
}



function mostrarDeudores(data){
    var table = document.getElementById('tabladeudores');
    for(var i=0;i<data.length; i++){
        var row = `<tr>
                        <td>${data[i].nombreCompleto}</td>
                        <td>${data[i].correo}</td>
                        <td>${data[i].numeroContacto}</td>
                        <td>$${data[i].deudaActual}</td>
                        <td><input type="button" value="Ver detalles" onclick="abrirDetalle(${data[i].idDeudor})"></td>
                    </tr>`
        table.innerHTML += row;
    }
}

function abrirDetalle(idDeudor){
    document.location.href = "deudorasignado.html?id="+idDeudor;
}

window.onload = function(){
    validarCobrador();
    cargarDeudores();
}