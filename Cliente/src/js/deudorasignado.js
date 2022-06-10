var params = window.location.search.substring(1);
var values = {};
const URL = "http://localhost:3000/"
var deuda;
var idUsuario = localStorage.getItem('idUsuario');


function extraerParams(){
    id = params.split("=");
    return id[1];
}

function extraerTiempo(params){
    fecha = params.split("T");
    return fecha[0];
}

function obtenerDeudor(idCobrador){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(this.response);
        if(data[0].deudaActual === 0){
            document.getElementById("btnregistro").hidden = true;
            document.getElementById("labeldeuda").hidden = false;
        }
        cargarInfo(data)
    }
    };
    xhttp.open("GET", URL+"cobradores"+"/deudores/"+idCobrador+"/"+extraerParams(), true);
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
    deuda = data[0].deudaActual;
}

function registrarPago(data){
    try {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            alert(this.response);
            location.reload();
        }
        };
        xhttp.open("POST", URL+"deudores"+"/"+extraerParams()+"/"+"pagos", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(data);
    } catch (error) {
        alert("Error de pago")
    }
}

function validarPago(monto){
    if(deuda > monto){
        return true;
    }else{
        return false;
    }
}

function guardarRegistro(){
    var monto = document.getElementById("inputMonto").value;
        if(isNaN(monto)){
            document.getElementById("alerterror").hidden = false;
        }else{
            if(validarPago(monto)){
                const pago = {
                    monto: monto,
                    idDeudor: extraerParams()
                }
                registrarPago(JSON.stringify(pago));
            }else{
                document.getElementById("alerterrorpago").hidden = false;
            }
        }
}

function cerrarSesion(){
    window.location.href = "../index.html";
}

function validarCobrador(){
    if(localStorage.getItem('tipoUsuario') != "cobrador"){
        document.location.href = "../index.html";
    }
}

window.onload = function(){
    validarCobrador();
    obtenerDeudor(idUsuario);
    obtenerPagos(extraerParams());
}