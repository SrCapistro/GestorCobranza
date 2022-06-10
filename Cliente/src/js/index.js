var URL_BASE = "http://localhost:3000/"
var tipoUsuario;

function iniciarSesion(){
  var usuario = document.getElementById("inputUsuario").value;
  var contraseña = document.getElementById("inputContra").value;
  var tipo = document.getElementById("chkadmin").checked;
  const credenciales = {
    usuario: usuario,
    contraseña: contraseña,
    tipo: tipo
  }
  obtenerDatos(JSON.stringify(credenciales));
}

//login
function obtenerDatos(data){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var datos = JSON.parse(this.response);
        validarDatos(datos)
      }
    };
    xhttp.open("POST", URL_BASE+"login", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(data);
}

function validarDatos(datos){
  try {
    if(datos[0].idUsuario != null && datos[0].idCobrador == null){
      tipoUsuario = "admin";
      localStorage.setItem('tipoUsuario', tipoUsuario);
      document.location.href = "./views/main.html";
    }else if(datos[0].idUsuario == null && datos[0].idCobrador !=null){
      idUsuario = datos[0].idCobrador;
      tipoUsuario = "cobrador";
      idSucursal = datos[0].idSucursal;
      document.location.href = "./views/panelcobrador.html";
      localStorage.setItem('idUsuario', idUsuario)
      localStorage.setItem('idSucursal', idSucursal);
      localStorage.setItem('tipoUsuario', tipoUsuario);
    } 
  } catch (error) {
    document.getElementById("alerterror").hidden = false;
  }
}

window.onload = function() {
  localStorage.removeItem("tipoUsuario");
  
}
