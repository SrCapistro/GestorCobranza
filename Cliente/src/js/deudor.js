const URL = "http://localhost:3000/"

var params = window.location.search.substring(1);
var values = {};
var idSucursal;

function validarAdmin(){
    if(localStorage.getItem('tipoUsuario') != "admin" || localStorage.getItem('tipoUsuario') === null ){
        document.location.href = "../index.html";
    }
}

function extraerParams(){
    id = params.split("=");
    return id[1];
}

function extraerTiempo(params){
    fecha = params.split("T");
    return fecha[0];
}

function obtenerDeudor(idDeudor){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(this.response);
        cargarInfo(data)
    }
    };
    xhttp.open("GET", URL+"deudores"+"/"+idDeudor, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
}

function obtenerCobradores(idSucursal){
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
}

function obtenerPagos(idDeudor){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(this.response);
        cargarPagos(data);
    }
    };
    xhttp.open("GET", URL+"deudores"+"/"+idDeudor+"/"+"pagos", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
}

function cargarCobradores(data){
    var comboCobradores = document.getElementById("comboCobradores");
    for(var i=0;i<data.length; i++){
        var cobrador = `<option value="${data[i].idCobrador}">${data[i].nombreCobrador}</option>`
        comboCobradores.innerHTML += cobrador;
    }
}

function cargarInfo(data){
    document.getElementById("inputNombre").value = data[0].nombreCompleto;
    document.getElementById("inputEmail").value = data[0].correo;
    document.getElementById("inputNumero").value = data[0].numeroContacto;
    document.getElementById("labelDeudaTotal").innerHTML= "$"+data[0].cantidadDeuda;
    document.getElementById("labelDeudaActual").innerHTML = "$"+data[0].deudaActual;
    document.getElementById("inputColonia").value = data[0].colonia;
    document.getElementById("inputCalle").value = data[0].calle;
    document.getElementById("inputCiudad").value = data[0].ciudad;
    document.getElementById("inputZip").value = data[0].codigoPostal;
    idSucursal = data[0].idSucursal;
    console.log(data[0].nombreCobrador);
    obtenerCobradores(idSucursal);
    if(data[0].nombreCobrador == null){
        document.getElementById("labelCobrador").innerHTML = "Cobrador no asignado"
    }else{
        document.getElementById("labelCobrador").innerHTML = data[0].nombreCobrador;
    }
}

function cargarPagos(data){
    var table = document.getElementById('tablapagos');
    for(var i=0;i<data.length; i++){
        
        var row = `<tr>
                        <td>$${data[i].monto}</td>
                        <td>${extraerTiempo(data[i].fechaPago)}</td>
                    </tr>`
        table.innerHTML += row;
    }
}

function guardarCambios(){
    var nombreCompleto = document.getElementById("inputNombre").value;
    var correo = document.getElementById("inputEmail").value;
    var numeroContacto = parseInt(document.getElementById("inputNumero").value);
    var colonia = document.getElementById("inputColonia").value;
    var calle = document.getElementById("inputCalle").value;
    var ciudad = document.getElementById("inputCiudad").value;
    var zip = document.getElementById("inputZip").value;
    var idCobrador = document.getElementById("comboCobradores").value;
    const deudor = {
        nombreCompleto: nombreCompleto,
        correo: correo,
        numeroContacto: numeroContacto,
        idCobrador: idCobrador,
        colonia: colonia,
        calle: calle,
        ciudad: ciudad,
        codigoPostal: zip
    }
    var body = JSON.stringify(deudor);
    registrarCambios(body);
}

function registrarCambios(data){
    try {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                alert(this.response);
                location.reload();
            }
        };
        xhr.open("PUT", URL+"deudores/"+extraerParams(), true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(data);
    } catch (error) {
        alert("Error con el servidor")
    }
}


function eliminarDeudor(){
    var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            alert(this.response)
            document.location.href = "deudores.html"
        }
        };
        xhttp.open("DELETE", URL+"deudores/"+extraerParams(), true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(); 
}

function habilitarCampos(){
    document.getElementById("inputNombre").removeAttribute("readonly");
    document.getElementById("inputEmail").removeAttribute("readonly");
    document.getElementById("inputNumero").removeAttribute("readonly");
    document.getElementById("labelDeudaTotal").removeAttribute("readonly");
    document.getElementById("labelDeudaActual").removeAttribute("readonly");
    document.getElementById("inputColonia").removeAttribute("readonly");
    document.getElementById("inputCalle").removeAttribute("readonly");
    document.getElementById("inputCiudad").removeAttribute("readonly");
    document.getElementById("inputZip").removeAttribute("readonly");
}

window.onload = function(){
    validarAdmin();
    obtenerDeudor(extraerParams());
    obtenerPagos(extraerParams());
}