const tam = 10; //variable del tamaño del lado del tablero, para poder cambiarlo en cualquier momento
const casillero = document.getElementById('casillero');
const casillasLibres = [];
const casillasOcupadas = [];

//FORMACIÓN DEL TABLERO
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
        casilla.classList.add('casilla'); //!! esto le añade al class="casilla" de html esta clase casilla concreta, así desde css va a ser más fácil decorarlas
        casilla.innerHTML = `<input type='text' class='input_casilla' id=input_casilla_num${i}>`; //una clase para todas las casillas, un id para cada una por si acaso

        casilla.addEventListener('click', casillaPulsada(casilla));

        casillasLibres.add(casilla); //añadimos la casilla al array de casillas vacías
        casillero.appendChild(casilla); //añadimos la casilla al casillero
    }

}

formarCasillero(tam); 


//TODO
function flujoPartida(){

    let turno = 1;
    

    while(comprobarFinPartida){

        //TURNO J1
        if(turno%2 != 0){
            
        //comprobar sobre la casilla a la que le ha hecho click:
        casilla = document.getElementById('casilla1'); //TODO: esto tengo que ver cómo lo hago

        //va a poner letra
        if(detectorClick(casilla) === 1){


        //va a marcar OSO
        }else{
            comprobarOSO();
        }



        //TURNO J2
        }else{
            





        }

        turno++;
    }

    

}

function detectorClick(casilla){
    casilla.addEventListener('mousedown', function(event){
        if(casilla.button === 0){
            return 1;
        }else if(casilla.button === 1){
            return 2;
        }else{
            return 0;
        }
    });
}

function casillaPulsada(casilla){
    casillasOcupadas.add(casilla);
}

function turnoJ1(){
    casillero.classList.add('turnoJ1'); //añade una clase y quita otra
    casillero.classList.remove('turnoJ2');
}

function turnoJ2(){
    casillero.classList.add('turnoJ2'); //añade una clase y quita otra
    casillero.classList.remove('turnoJ1');
}

//TODO
function comprobarOSO(){

    //CONDICIONES OSO:
    /*
    1. la primera O es una casilla ocupada
    2. la S es una de las casillas de alrededor y está ocupada
    3. la segunda O es la que continúa a la S y también está ocupada
    */

}

function comprobarFinPartida(casillasOcupadas){
    if(casillasOcupadas < (tam*tam)){
        return true;
    }else{
        false;
    }

}
