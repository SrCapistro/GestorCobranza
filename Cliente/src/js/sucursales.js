const URL = "http://localhost:3000/"

function validarAdmin(){
    if(localStorage.getItem('tipoUsuario') != "admin" || localStorage.getItem('tipoUsuario') === null ){
        document.location.href = "../index.html";
    }
}

function cargarSucursales(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(this.response);
        mostrarSucursales(data);
    }
    };
    xhttp.open("GET", URL+"sucursales", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
}

function mostrarSucursales(data){
    var table = document.getElementById('tablasucursales');
    for(var i=0;i<data.length; i++){
        var row = `<tr>
                        <td>${data[i].nombreSucursal}</td>
                        <td>${data[i].ciudad}</td>
                        <td>${data[i].colonia}</td>
                        <td><input type="button" value="Ver detalles" onclick="abrirDetalle(${data[i].idSucursal})"></td>
                    </tr>`
        table.innerHTML += row;
    }
}

function abrirDetalle(idSucursal){
    document.location.href = "sucursal.html?id="+idSucursal
}

function abrirRegistro(){
    document.location.href = "registrosucursal.html";
}

window.onload = function(){
    validarAdmin();
    cargarSucursales();
}