const URL = "http://localhost:3000/"

function validarAdmin(){
    if(localStorage.getItem('tipoUsuario') != "admin" || localStorage.getItem('tipoUsuario') === null ){
        document.location.href = "../index.html";
    }
}

function guardarRegistro(){
    if(validarCampos()){
        var nombreCobrador = document.getElementById("inputNombre").value;
    var correo = document.getElementById("inputEmail").value;
    var numeroContacto = document.getElementById("inputNumero").value;
    var usuario = document.getElementById("inputUsuario").value;
    var contraseña = document.getElementById("inputPass").value;
    var contraseñaRepeat = document.getElementById("inputPassRepeat").value;
    var idSucursal = parseInt(document.getElementById("comboSucursales").selectedIndex)+1;
    const cobrador = {
        nombreCobrador: nombreCobrador,
        numeroContacto: numeroContacto,
        correo: correo,
        idSucursal: idSucursal,
        usuario: usuario,
        contraseña: contraseña
    }
        if(validarContraseñas(contraseña, contraseñaRepeat)){
            var body = JSON.stringify(cobrador);
            registrarCobrador(body);
        }else{
            alert("La contraseñas no coinciden");
        }
    }else{
        document.getElementById("alerterror").hidden = false;
    }
}

function validarCampos(){
    var nombreCompleto = document.getElementById("inputNombre").value;
    var correo = document.getElementById("inputEmail").value;
    var numeroContacto = parseInt(document.getElementById("inputNumero").value);
    var contraseña = document.getElementById("inputPass").value;
    if(nombreCompleto == "" || correo == "" || numeroContacto == "" || contraseña == ""){
        return false;
    }else{
        return true;
    }
}

function registrarCobrador(data){
    try {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                alert(this.response);
                location.reload();
            }
        };
        xhr.open("POST", URL+"cobradores", true);
        console.log(data);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(data);
    } catch (error) {
        alert("Error con el servidor")
    }
}

function validarContraseñas(contra1, contra2){
    if(contra1 === contra2){
        return true;
    }else{
        return false;
    }
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
        var sucursal = `<option>${data[i].nombreSucursal}</option>`
        comboSucursales.innerHTML += sucursal;
    }
}

window.onload = function(){
    validarAdmin();
    obtenerSucursales();
}