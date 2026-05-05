function saludar(){
    //Obtener el valor del input
    let nombre = document.getElementById("nombre").value;

    //Validar si el usuario escribió algo
    if(nombre == ""){
        document.getElementById("resultado").innerText = "Por favor, ingresa tu nombre.";
    }else{
        document.getElementById("resultado").innerText = "Hola " + nombre + ", bienvenido al sistema.";
    }
}

function validarCorreo(){
    let correo = document.getElementById("correo").value;

    if(correo === ""){
        document.getElementById("mensajeCorreo").innerText = "Debe ingresar un correo.";
    }else{
        document.getElementById("mensajeCorreo").innerText = "Correo registrado correctamente.";
    }
}