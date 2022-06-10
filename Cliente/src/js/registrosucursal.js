const URL = "http://localhost:3000/"

function validarAdmin(){
    if(localStorage.getItem('tipoUsuario') != "admin" || localStorage.getItem('tipoUsuario') === null ){
        document.location.href = "../index.html";
    }
}

function guardarRegistro(){
    if(validarCampos()){
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
        registrarSucursal(body);  
    }else{
        document.getElementById("alerterror").hidden = false;
    }
}

function validarCampos(){
    var nombreSucursal = document.getElementById("inputNombre").value;
    var calle = document.getElementById("inputCalle").value;
    var colonia = document.getElementById("inputColonia").value;
    var codigoPostal = document.getElementById("inputZip").value;
    var ciudad = document.getElementById("inputCiudad").value;
    if(nombreSucursal === "" || calle === "" || colonia === "" || codigoPostal === "" || ciudad == ""){
        return false;
    }else{
        return true;
    }
}

function registrarSucursal(data){
    try {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                alert(this.response);
                location.reload();
            }
        };
        xhr.open("POST", URL+"sucursales", true);
        console.log(data);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(data);
    } catch (error) {
        alert("Error con el servidor")
    }
}

window.onload = function(){
    validarAdmin();
}