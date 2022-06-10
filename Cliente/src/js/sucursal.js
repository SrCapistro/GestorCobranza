var params = window.location.search.substring(1);
var values = {};
const URL = "http://localhost:3000/"

function extraerParams(){
    id = params.split("=");
    return id[1];
}

function validarAdmin(){
    if(localStorage.getItem('tipoUsuario') != "admin" || localStorage.getItem('tipoUsuario') === null ){
        document.location.href = "../index.html";
    }
}

function obtenerSucursal(idSucursal){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(this.response);
        cargarInfo(data)
    }
    };
    xhttp.open("GET", URL+"sucursales"+"/"+idSucursal, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
}


function cargarInfo(data){
    document.getElementById("inputNombre").value = data[0].nombreSucursal;
    document.getElementById("inputCalle").value = data[0].calle;
    document.getElementById("inputColonia").value = data[0].colonia;
    document.getElementById("inputZip").value = data[0].codigoPostal;
    document.getElementById("inputCiudad").value = data[0].ciudad;
}


function habilitarCampos(){
    document.getElementById("inputNombre").removeAttribute("readonly")
    document.getElementById("inputCalle").removeAttribute("readonly")
    document.getElementById("inputColonia").removeAttribute("readonly")
    document.getElementById("inputZip").removeAttribute("readonly")
    document.getElementById("inputCiudad").removeAttribute("readonly")
}

function guardarRegistro(){
    var nombreSucursal = document.getElementById("inputNombre").value;
    var calle = document.getElementById("inputCalle").value;
    var colonia = document.getElementById("inputColonia").value;
    var codigoPostal = document.getElementById("inputZip").value;
    var ciudad = document.getElementById("inputCiudad").value;
    const sucursal = {
        nombreSucursal: nombreSucursal,
        calle: calle,
        colonia: colonia,
        codigoPostal: codigoPostal,
        ciudad: ciudad
    }
    var body = JSON.stringify(sucursal);
    actualizarSucursal(body); 
}


function actualizarSucursal(data){
    try {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                alert(this.response);
                location.reload();
            }
        };
        xhr.open("PUT", URL+"sucursales"+"/"+extraerParams(), true);
        console.log(data);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(data);
    } catch (error) {
        alert("Error con el servidor")
    }
}

window.onload = function(){
    validarAdmin();
    obtenerSucursal(extraerParams());
}