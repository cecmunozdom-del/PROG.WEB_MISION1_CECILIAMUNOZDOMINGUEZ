const botonNormas = document.getElementById('normas');
const botonControles = document.getElementById('controles');

const mostrarNormas = document.getElementById('mostrarNormas');
const mostrarControles = document.getElementById('mostrarControles');

const cerrarNormas = document.getElementById('cerrarNormas');
const cerrarControles = document.getElementById('cerrarControles');

//Lógica de abrir y cerrar pestañas del menú (al cambiar de flex a none se hacen visibles o no)

//Normas
botonNormas.addEventListener('click', function() {
    mostrarNormas.classList.toggle('activo');
});

cerrarNormas.addEventListener('click', function() {
    mostrarNormas.classList.toggle('activo');
});

//Controles
botonControles.addEventListener('click', function() {
    mostrarControles.classList.toggle('activo');
});

cerrarControles.addEventListener('click', function() {
    mostrarControles.classList.toggle('activo');
});