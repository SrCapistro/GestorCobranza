var params = window.location.search.substring(1);
var values = {};
const URL = "http://localhost:3000/"

function validarAdmin(){
    if(localStorage.getItem('tipoUsuario') != "admin" || localStorage.getItem('tipoUsuario') === null ){
        document.location.href = "../index.html";
    }
}

function obtenerCobrador(idCobrador){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(this.response);
        cargarInfo(data)
    }
    };
    xhttp.open("GET", URL+"cobradores"+"/"+idCobrador, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
}

function extraerParams(){
    id = params.split("=");
    return id[1];
}

function obtenerSucursales(){
    try {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.response);
            cargarSucursales(data);
        }
        };
        xhttp.open("GET", URL+"sucursales", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send();
    } catch (error) {
        alert("Error de conexión")
    }
}

function cargarSucursales(data){
    var comboSucursales = document.getElementById("comboSucursales");
    for(var i=0;i<data.length; i++){
        var sucursal = `<option value="${data[i].idSucursal}">${data[i].nombreSucursal}</option>`
        comboSucursales.innerHTML += sucursal;
    }
}

function cargarInfo(data){
    document.getElementById("inputNombre").value = data[0].nombreCobrador;
    document.getElementById("inputNumero").value = data[0].numeroContacto;
    document.getElementById("inputEmail").value = data[0].correo;
    document.getElementById("inputUsuario").value = data[0].usuario;
    document.getElementById("labelSucursal").innerHTML = data[0].nombreSucursal;

}

function habilitarCampos(){
    document.getElementById("inputNombre").removeAttribute("readonly")
    document.getElementById("inputNumero").removeAttribute("readonly")
    document.getElementById("inputEmail").removeAttribute("readonly")
    document.getElementById("inputUsuario").removeAttribute("readonly")
}

function eliminarCobrador(){
    var idCobrador = extraerParams();
    const data = {
        idCobrador: idCobrador
    }
    var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            alert(this.response)
            document.location.href = "cobradores.html"
        }
        };
        xhttp.open("DELETE", URL+"cobradores", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify(data)); 
}

function cambiarContraseña(){
    var contraseña = document.getElementById("inputPass").value;
    var contraseñaRepeat = document.getElementById("inputPassRepeat").value;
    if(validarContraseñas(contraseña, contraseñaRepeat)){
        guardarContraseña(contraseña);
    }else{
        alert("La contraseñas no coinciden o son invalidas");
    }
}

function validarContraseñas(contra1, contra2){
    if(contra1 === contra2 && contra1 != ""){
        return true;
    }else{
        return false;
    }
}

function guardarContraseña(contra){
    const data = {
        contra: contra
    }
    try {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                alert(this.response);
                location.reload();
            }
        };
        xhr.open("PUT", URL+"cobradores/pass/"+extraerParams(), true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(JSON.stringify(data));
    } catch (error){
        alert("Error con el servidor")
    }
}

function guardarRegistro(){
    if(validarCampos()){
        var nombreCobrador = document.getElementById("inputNombre").value;
        var correo = document.getElementById("inputEmail").value;
        var numeroContacto = document.getElementById("inputNumero").value;
        var usuario = document.getElementById("inputUsuario").value;
        var idSucursal = parseInt(document.getElementById("comboSucursales").value);
        const cobrador = {
            nombreCobrador: nombreCobrador,
            numeroContacto: numeroContacto,
            correo: correo,
            idSucursal: idSucursal,
            usuario: usuario,
        }
        var body = JSON.stringify(cobrador);
        guardarCambios(body);

    }else{
        document.getElementById("alerterror").hidden = false;
    }
}

function guardarCambios(data){
    try {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                alert(this.response);
                location.reload();
            }
        };
        xhr.open("PUT", URL+"cobradores/"+extraerParams(), true);
        console.log(data);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(data);
    } catch (error) {
        alert("Error con el servidor")
    }
}

function validarCampos(){
    var nombreCompleto = document.getElementById("inputNombre").value;
    var correo = document.getElementById("inputEmail").value;
    var numeroContacto = parseInt(document.getElementById("inputNumero").value);
    if(nombreCompleto == "" || correo == "" || numeroContacto == ""){
        return false;
    }else{
        return true;
    }
}

window.onload = function(){
    validarAdmin();
    obtenerCobrador(extraerParams())
    obtenerSucursales();
}