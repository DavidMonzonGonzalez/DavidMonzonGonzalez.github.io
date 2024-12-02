
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

DOM.formulario.addEventListener("submit", (e)=>{
    if(conteoChecked() < 2){
        e.preventDefault()
        alert("Debe seleccionar al menos dos aficiones")
    };
    let noRellenado = [];
    DOM.lista.map(input => {
        if(input.value === ""){
            e.preventDefault()
            noRellenado.push(input.name);
        }
    });
    alert(`No se han rellenado los siguientes campos: \n ${noRellenado.join(`\n`)}`);
})

