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
        enviarAficiones: document.getElementsByName('Aficiones'),
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
function generarAnios() {
    const selectAnio = document.getElementById("AnioNacimiento");
    const anioActual = 2010; 
    const aniofinal = 1920; 
    for (let anio = anioActual; anio >= aniofinal; anio--) {
        const opcion = document.createElement("option");
        opcion.value = anio;
        opcion.textContent = anio;
        selectAnio.appendChild(opcion);
    }
}
function conteoTitulo() {
    let conteo = document.getElementById('titulo').value;
    let cambio = document.getElementById('contadorTitulo');
    cambio.innerHTML = `${conteo.length}/15`; 
}
function conteoDescr(){
    let conteo = document.getElementById('Descripcion').value;
    let cambio = document.getElementById('contadorDescrip');
    cambio.innerHTML = `${conteo.length}/120`; 
}
document.getElementById('showPassword').addEventListener('change', function() {
    const passwordField = document.getElementById('password');
    if (this.checked) {
        passwordField.type = 'text';
    } else {
        passwordField.type = 'password';
    }
});
function conteoChecked(){
    let conteo = 0; 
    Array.from(DOM.aficiones).forEach(elemento =>{
        if(elemento.checked){
            conteo++;
        }
    })
    return conteo;
}
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
function validacionDNI(documento ){
    let valor = document.getElementById('DNI-NIE_select').value;
    let resultado;
    if(valor === "DNI"){
        let numDNI = documento.slice(0, -1);
        let letraDNI = documento.slice(-1);
        let stringLetras = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E']
        let resto = numDNI % 23;
        resultado = (stringLetras[resto].toLocaleUpperCase() === letraDNI);
    }
    else{
        let numNIE;
        let letraNIE = documento.slice(-1);
        switch (documento[0].toLocaleUpperCase()){
            case 'X':
                numNIE = '0' + documento.slice(0, -1);
                break;
            case 'Y':
                numNIE = '1' + documento.slice(0, -1);
                break;
            case 'Z':
                numNIE = '2' + documento.slice(0, -1);
                break;
        }  
        let restoNIE = numNIE % 23;
        resultado = (stringLetras[restoNIE].toLocaleUpperCase() === letraNIE);
    }
    if (!resultado && valor === "DNI") {
        DOM.dni_nie.setCustomValidity("El DNI no es válido");
    } 
    else if(!resultado && valor === "NIE"){
        DOM.dni_nie.setCustomValidity("El NIE no es válido");
    }
    else {
        DOM.dni_nie.setCustomValidity("");
    }

    return resultado;
}
function mensajesError(nombre, mensaje, estado) {
    let elemento = document.getElementsByName(nombre)[0];
    let errorElemento = document.getElementById(`error${nombre}`);
    if (errorElemento) {
        document.body.removeChild(errorElemento);
    }
    if (estado === "invalido") {
        let error = document.createElement('p');
        let div = document.getElementById('mensajesError');
        error.className = "errores";
        error.id = nombre;
        error.textContent = `${nombre}: ${mensaje}`;
        div.appendChild(error);
        if (nombre != "Aficiones"){
            let errorPersonalizado = document.createElement('p');
            errorPersonalizado.className = "errorPersonalizado";
            
            errorPersonalizado.id = `error${nombre}`;
            errorPersonalizado.textContent = (mensaje === "Completa este campo") ? "Debe rellenar esta sección" : "Debe introducir correctamente los datos";
            if (elemento){
                elemento.insertAdjacentElement('afterend', errorPersonalizado);
            } else {
                console.error("No se encontró el elemento con el nombre:", nombre);
            }
        }
    }
}



DOM.formulario.addEventListener("submit", (e)=>{
    document.getElementById('mensajesError').textContent = "";
    conteoChecked() < 2 
    ? (e.preventDefault(), 
    mensajesError("Aficiones", "Debe marcar al menos 2 aficiones", "invalido"))
    : (DOM.enviarAficiones.value = aficionesMarcadas());
    DOM.lista.map(input => {
        input.validationMessage != "" 
        ? (e.preventDefault(), mensajesError(input.name, input.validationMessage, "invalido")) 
        : mensajesError(input.name, input.validationMessage, "valido")
    });
})


