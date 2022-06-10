const URL = "http://localhost:3000/"

function validarAdmin(){
    if(localStorage.getItem('tipoUsuario') != "admin" || localStorage.getItem('tipoUsuario') === null ){
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
    xhttp.open("GET", URL+"deudores", true);
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
    document.location.href = "deudor.html?id="+idDeudor;
}

function abrirRegistro(){
    document.location.href = "registrodeudor.html";
}

window.onload = function(){
    validarAdmin();
    cargarDeudores();
}