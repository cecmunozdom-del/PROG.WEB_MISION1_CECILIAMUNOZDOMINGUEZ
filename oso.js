const tam = 10; //variable del tamaño del lado del tablero, para poder cambiarlo en cualquier momento

function formarCasillero(lado){
    const casillero = document.getElementById('casillero');

    //innerHTML modifica el contenido dentro de un elemento del DOM
    //en este caso nos sirve para "vaciar" todo el casillero
    casillero.innerHTML = "";

    //divisón en filas y columnas
    casillero.style.gridTemplateColumns = `repeat(${lado}, 1fr)`;
    casillero.style.gridTemplateRows = `repeat(${lado}, 1fr)`;

    let casillas = lado * lado;
    for(let i = 0; i < casillas; i++){
        let casilla = document.createElement('div');
        casilla.classList.add('casilla'); //!! esto le añade al class="casilla" de html esta clase casilla concreta
                                         //así desde css va a ser más fácil decorarlas
        casilla.innerHTML = `<input type='text' class='input_casilla' id=input_casilla_num${i}>`; //una clase para todas las casillas, un id para cada una por si acaso
        // TODO: borrar eta vaina -> casilla.addEventListener('click', () => {console.log(`Has pulsado la casilla número ${i}`);}); LAS CASILLAS VAN NUMERADAS ESO ES GOOOOD

        casillero.appendChild(casilla);
    }

}

formarCasillero(tam); 


//TODO
function flujoPartida(){






}



//lo separo en 2 porque queremos distintos colores en el hover y tal pero igual acaba no haciendo falta
function turnoJugador1(){

}

function turnoJugador2(){

}