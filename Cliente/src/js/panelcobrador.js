function validarCobrador(){
    if(localStorage.getItem('tipoUsuario') != "cobrador"){
        document.location.href = "../index.html";
    }
}

window.onload = function(){
    validarCobrador();
}