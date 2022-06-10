const URL = "http://localhost:3000/"

function validarAdmin(){
    if(localStorage.getItem('tipoUsuario') != "admin" || localStorage.getItem('tipoUsuario') === null ){
        document.location.href = "../index.html";
    }
}

function cargarCobradores(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(this.response);
        mostrarCobradores(data);
    }
    };
    xhttp.open("GET", URL+"cobradores", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
}

function mostrarCobradores(data){
    var table = document.getElementById('tablacobradores');
    for(var i=0;i<data.length; i++){
        var row = `<tr>
                        <td>${data[i].nombreCobrador}</td>
                        <td>${data[i].numeroContacto}</td>
                        <td>${data[i].correo}</td>
                        <td><input type="button" value="Ver detalles" onclick="abrirDetalle(${data[i].idCobrador})"></td>
                    </tr>`
        table.innerHTML += row;
    }
}

function abrirDetalle(idCobrador){
    document.location.href = "cobrador.html?id="+idCobrador
}

function abrirRegistro(){
    document.location.href = "registrocobrador.html";
}

window.onload = function(){
    validarAdmin();
    cargarCobradores();
}