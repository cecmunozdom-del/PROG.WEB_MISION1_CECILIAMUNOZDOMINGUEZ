const botonNormas = document.getElementById('normas');
const botonControles = document.getElementById('controles');

const mostrarNormas = document.getElementById('mostrarNormas');
const mostrarControles = document.getElementById('mostrarControles');

const cerrarNormas = document.getElementById('cerrarNormas');
const cerrarControles = document.getElementById('cerrarControles');

//Lógica de abrir y cerrar pestañas del menú (al cambiar de flex a none se hacen visibles o no)

//Normas
botonNormas.addEventListener('click', function(e){
    e.preventDefault(); //evita que busque el enlace (que no existe) para que salga la pantalla directamente
    mostrarNormas.style.display = 'flex';
})

cerrarNormas.addEventListener('click', function(){
    mostrarNormas.style.display = 'none';
})

//Controles
botonControles.addEventListener('click', function(e){
    e.preventDefault();
    mostrarControles.style.display = 'flex';
})

cerrarControles.addEventListener('click', function(){
    mostrarControles.style.display = 'none';
})