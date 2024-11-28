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

generarAnios();

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