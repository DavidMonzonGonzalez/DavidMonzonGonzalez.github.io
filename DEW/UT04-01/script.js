
const DOM = {
    formulario: document.getElementById('formulario'),
    lista: [
        nombreUsuario = document.getElementById('userName'),
        contraseña = document.getElementById('password'),
        nombre = document.getElementById('Nombre'),
        apellidos = document.getElementById('Apellidos'),
        telefono = document.getElementById('telefono'),
        codigoPostal = document.getElementById('codigoPostal'),
        dni_nie = document.getElementById('DNI-NIE'),
        titulo = document.getElementById('titulo'), 
        descripcion = document.getElementById('Descripcion')
    ],
    nombreUsuario: document.getElementById('userName'),
        contraseña: document.getElementById('password'),
        nombre: document.getElementById('Nombre'),
        apellidos: document.getElementById('Apellidos'),
        telefono: document.getElementById('telefono'),
        codigoPostal: document.getElementById('codigoPostal'),
        dni_nie: document.getElementById('DNI-NIE'),
        titulo: document.getElementById('titulo'), 
        descripcion: document.getElementById('Descripcion'),
    aficiones: document.getElementsByName("aficiones")
}

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
    DOM.aficiones.forEach(elemento =>{
        if(elemento.checked){
            conteo++;
        }
    })
    return conteo;
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

DOM.formulario.addEventListener("submit", (e)=>{
    if(conteoChecked() < 2){
        e.preventDefault()
        alert("Debe seleccionar al menos dos aficiones")
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

