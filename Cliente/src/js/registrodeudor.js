const URL = "http://localhost:3000/"

function validarAdmin(){
    if(localStorage.getItem('tipoUsuario') != "admin" || localStorage.getItem('tipoUsuario') === null ){
        document.location.href = "../index.html";
    }
}

function guardarRegistro(){
    if(validarCampos()){
        var nombreCompleto = document.getElementById("inputNombre").value;
        var correo = document.getElementById("inputEmail").value;
        var numeroContacto = parseInt(document.getElementById("inputNumero").value);
        var deudaTotal = parseInt(document.getElementById("inputDeudaTotal").value);
        var colonia = document.getElementById("inputColonia").value;
        var calle = document.getElementById("inputCalle").value;
        var ciudad = document.getElementById("inputCiudad").value;
        var zip = document.getElementById("inputZip").value;
        const deudor = {
            nombreCompleto: nombreCompleto,
            correo: correo,
            numeroContacto: numeroContacto,
            cantidadDeuda: deudaTotal,
            deudaActual: deudaTotal,
            colonia: colonia,
            calle: calle,
            ciudad: ciudad,
            codigoPostal: zip
        }
        var body = JSON.stringify(deudor);
        registrarDeudor(body);
    }else{
        document.getElementById("alerterror").hidden = false;
    }
}

function registrarDeudor(data){
    try {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                alert(this.response);
                location.reload();
            }
        };
        xhr.open("POST", URL+"deudores", true);
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
    var deudaTotal = parseInt(document.getElementById("inputDeudaTotal").value);
    var colonia = document.getElementById("inputColonia").value;
    var calle = document.getElementById("inputCalle").value;
    var ciudad = document.getElementById("inputCiudad").value;
    var zip = document.getElementById("inputZip").value;
    if(nombreCompleto == "" || correo == "" || numeroContacto == "" || colonia == "" || calle == ""
    || ciudad == "" || zip == "" || deudaTotal == ""){
        return false;
    }else{
        return true;
    }
}

function obtenerCobradores(idSucursal){
    try {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.response);
            cargarCobradores(data);
        }
        };
        xhttp.open("GET", URL+"cobradores/sucursal/"+idSucursal, true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send();
    } catch (error) {
        alert("Error de conexión")
    }
}

function cargarCobradores(data){
    var comboCobradores = document.getElementById("comboCobradores");
    vaciarCombo();
    for(var i=0;i<data.length; i++){
        var cobrador = `<option>${data[i].nombreCobrador}</option>`
        comboCobradores.innerHTML += cobrador;
    }
}

function vaciarCombo(){
    var comboCobradores = document.getElementById("comboCobradores");
    for(let i=comboCobradores.options.length; i>=0; i--){
        comboCobradores.remove(i);
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
        var sucursal = `<option value="${data[i].idSucursal}">${data[i].nombreSucursal}</option>`
        comboSucursales.innerHTML += sucursal;
    }
    comboSucursales = document.getElementById("comboSucursales");
    obtenerCobradores(comboSucursales.value);
    comboSucursales.addEventListener('change', function(){
        obtenerCobradores(comboSucursales.value);
    });
}

window.onload = function(){
    validarAdmin();
    obtenerSucursales();
}