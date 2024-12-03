
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
DOM.lista.push(DOM.nombreUsuario,
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
    const anioActual = new Date().getFullYear(); 
    const aniofinal = 1960; 
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

document.getElementById('DNI-NIE_select').addEventListener('change', function(){
    if(this.value === "DNI"){
        DOM.dni_nie.disabled = false;
        DOM.dni_nie.pattern = "[0-9]{8}[A-Z]{1}";
        DOM.dni_nie.placeholder = "ejemplo: 45861486F";
    }
    else{
        DOM.dni_nie.disabled = false;
        DOM.dni_nie.pattern = "[A-Z]{1}[0-9]{7}[A-Z]{1}";
        DOM.dni_nie.placeholder = "ejemplo: H5861486F";
    }
})

function validacionDNI(DNI){
    let resultado;
    if(document.getElementById('DNI-NIE_select').value === "DNI"){
        DOM.dni_nie.pattern = "^\d{8}[A-Za-z]$";
        let numDNI = DNI.slice(0, -1);
        let letraDNI = DNI.slice(-1);
        let stringLetras = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E']
        let resto = numDNI % 23;
        resultado = (stringLetras[resto].toLocaleUpperCase() === letraDNI);
    }    


    if (!resultado) {
        DOM.dni_nie.setCustomValidity("El DNI no es válido");
    } else {
        DOM.dni_nie.setCustomValidity("");
    }

    return resultado;
}


DOM.formulario.addEventListener("submit", (e)=>{
    validacionDNI(DOM.dni_nie.value)
    if(conteoChecked() < 2){
        e.preventDefault()
        alert("Debe seleccionar al menos dos aficiones")
    }
    else{
        DOM.enviarAficiones.value = aficionesMarcadas();
    };
    let noRellenado = [];
    DOM.lista.map(input => {
        if(input.validationMessage != ""){
            e.preventDefault()
            noRellenado.push(`${input.name}: ${input.validationMessage}`);
        }
    });
    alert(`Los siguientes campos no se han rellenado o se han rellenado mal: \n ${noRellenado.join(`\n`)}`);

})

