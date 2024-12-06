const DOM = {
    formulario: document.getElementById('formulario'),
    nombreUsuario: document.getElementById('userName'),
        contraseña: document.getElementById('password'),
        nombre: document.getElementById('Nombre'),
        apellidos: document.getElementById('Apellidos'),
        telefono: document.getElementById('telefono'),
        codigoPostal: document.getElementById('codigoPostal'),
        dni_nie: document.getElementById('DNI-NIE'),
        titulo: document.getElementById('titulo'), 
        descripcion: document.getElementById('Descripcion'),
        aficiones: document.getElementsByClassName("aficiones"),
        enviarAficiones: document.getElementsByName('Aficiones')[0],
        lista: []
}

DOM.lista.push(
    DOM.nombreUsuario,
    DOM.contraseña,
    DOM.nombre,
    DOM.apellidos,
    DOM.telefono,
    DOM.codigoPostal,
    DOM.dni_nie,
    DOM.titulo, 
    DOM.descripcion)
window.onload=generarAnios();
// Genero los años automáticamente desde 1920 hasta 2010
function generarAnios() {
    const selectAnio = document.getElementById("AnioNacimiento");
    const anioActual = 2010; 
    const aniofinal = 1920; 
    for (let anio = anioActual; anio >= aniofinal; --anio) {
        selectAnio.add(new Option(anio, anio));
    }
}
// Oculto o muestro la contraseña
document.getElementById('showPassword').addEventListener('change', function() {
    if (this.checked) {
        DOM.contraseña.type = 'text';
    } else {
        DOM.contraseña.type = 'password';
    }
});
// Cuento cuantas de las aficiones están seleccionadas
function conteoChecked(){
    let conteo = 0; 
    Array.from(DOM.aficiones).forEach(elemento =>{
        if(elemento.checked){
            conteo++;
        }
    })
    return conteo;
}
// Añado a una lista el nombre de las aficiones que están seleccionadas
function aficionesMarcadas(){
    let aficionesSeleccionadas = [];
    let enviarAficiones = "";
    Array.from(DOM.aficiones).forEach(elemento =>{
        if(elemento.checked){
            aficionesSeleccionadas.push(elemento.value);
        }
    })
    enviarAficiones = aficionesSeleccionadas.join(", ");
    return enviarAficiones;
}
document.getElementById('DNI-NIE_select').addEventListener('change', function() {
    const inputDniNie = document.getElementById('DNI-NIE');
    inputDniNie.disabled = false;
    if (this.value === "DNI") {
        inputDniNie.placeholder = "ejemplo: 45861486F";  
        inputDniNie.pattern = "^[0-9]{8}[A-Z]$";  
    }
    else if (this.value === "NIE") {
        inputDniNie.placeholder = "ejemplo: X5861486F";  
        inputDniNie.pattern = "^[X-Z][0-9]{7}[A-Z]$";  
    }
});
// Valido si el DNI o NIE son correctos
function validacionDNI(documento){
    let valor = document.getElementById('DNI-NIE_select').value;
    let resultado;
    const stringLetras = 'TRWAGMYFPDXBNJZSQVHLCKE';
    if(valor === "DNI"){
        let numDNI = documento.slice(0, -1);
        let letraDNI = documento.slice(-1);
        let resto = numDNI % 23;
        resultado = (stringLetras[resto] === letraDNI.toUpperCase());
    }
    else{
        let numNIE;
        let letraNIE = documento.slice(-1);
        switch (documento[0].toUpperCase()) {
            case 'X':
                numNIE = '0' + documento.slice(1, -1);
                break;
            case 'Y':
                numNIE = '1' + documento.slice(1, -1);
                break;
            case 'Z':
                numNIE = '2' + documento.slice(1, -1);
                break;
        }
        let restoNIE = Number(numNIE) % 23;
        console.log(restoNIE)
        resultado = (stringLetras[restoNIE] === letraNIE.toUpperCase());

    if (!resultado && valor === "DNI") {
        DOM.dni_nie.setCustomValidity("El DNI no es válido");
        console.log("entra DNI");
    } 
    else if(!resultado && valor === "NIE"){
        DOM.dni_nie.setCustomValidity("El NIE no es válido");
        console.log("entra NIE");
    }
    else {
        DOM.dni_nie.setCustomValidity("");
        console.log("entra NADA")
    }
    return resultado;
}
}
// Escribo los mensajes de error al enviar el formulario
function mensajesError(nombre, mensaje, estado) {
    let elemento = document.getElementsByName(nombre)[0];
    let errorElemento = document.getElementById(`error${nombre}`);
    if (errorElemento) {
        errorElemento.remove();
    }

    if (estado === "invalido") {
        let error = document.createElement('p');
        error.className = "errores";
        error.id = nombre;
        error.textContent = `${nombre}: ${mensaje}`;
        document.getElementById('mensajesError').appendChild(error); // Usar el div creado en el evento submit

        if (nombre != "Aficiones") {
            let errorPersonalizado = document.createElement('p');
            errorPersonalizado.className = "errorPersonalizado";
            errorPersonalizado.id = `error${nombre}`;
            errorPersonalizado.textContent = (mensaje === "Completa este campo") ? "Debe rellenar esta sección" : "Debe introducir correctamente los datos";
            elemento ? elemento.insertAdjacentElement('afterend', errorPersonalizado) : "";
        }
    }
}
// Borro (la parte de editar o añadir está comentada) los errores personalizados de debajo del input mientras el usuario escribe
function editarMensajesError(nombre){
    let elemento = document.getElementsByName(nombre)[0];
    let errorElemento = document.getElementById(`error${nombre}`);
    if(elemento.checkValidity()){
        if (errorElemento) {
            errorElemento.remove();
        }
    }
    // Esta parte la dejo comentada, pero realmente funciona para modificar el mensaje de error de debajo del input mientras el usuario escribe
    // else if(!errorElemento &&  !elemento.checkValidity()){
    //     let errorPersonalizado = document.createElement('p');
    //     errorPersonalizado.className = "errorPersonalizado";
    //     errorPersonalizado.id = `error${nombre}`;
    //     errorPersonalizado.textContent = (elemento.textContent != "") ? "" : "Debe introducir correctamente los datos";
    //     elemento.insertAdjacentElement('afterend', errorPersonalizado);
    // }
    // else{
    //     let cambiarTexto = document.getElementById(`error${nombre}`);
    //     cambiarTexto.textContent = "Debe introducir correctamente los datos";
    // }
}
// Realizo el conteo de caracteres introducidos en el input de Titulo
function conteoTitulo() {
    let conteo = document.getElementById('titulo').value;
    let cambio = document.getElementById('contadorTitulo');
    cambio.textContent = `${conteo.length}/15`; 
}
// Realizo el conteo de caracteres introducidos en el input de Descripción
function conteoDescr(){
    let conteo = document.getElementById('Descripcion').value;
    let cambio = document.getElementById('contadorDescrip');
    cambio.textContent = `${conteo.length}/120`; 
}
// Realizo las validaciones antes del envio del formulario
DOM.formulario.addEventListener("submit", (e) => {
    // Limpiar mensajes de error anteriores
    const mensajesErrorElement = document.getElementById('mensajesError');
    if (mensajesErrorElement) {
        mensajesErrorElement.remove();
    }

    // Crear un nuevo div para mensajes de error
    let div = document.createElement('div');
    div.id = "mensajesError";
    document.getElementById('principal').appendChild(div);
    document.getElementById('principal').className = "principalModificado";

    // Validar aficiones
    if (conteoChecked() < 2) {
        e.preventDefault();
        mensajesError("Aficiones", "Debe marcar al menos 2 aficiones", "invalido");
    } else {
        DOM.enviarAficiones.value = aficionesMarcadas();
    }

    // Validar inputs
    DOM.lista.map(input => {
        if (input.validationMessage != "") {
            e.preventDefault();
            mensajesError(input.name, input.validationMessage, "invalido");
        } else {
            mensajesError(input.name, input.validationMessage, "valido");
        }
    });
})