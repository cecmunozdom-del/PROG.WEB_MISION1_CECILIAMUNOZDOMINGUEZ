let turno = 1;
let puntosJ1 = 0;
let puntosJ2 = 0;

const tam = 10; //variable del tamaño del lado del tablero, para poder cambiarlo en cualquier momento
const casillero = document.getElementById('casillero');

let casillasLibres = [];
let casillasOcupadas = [];
let casillasOso = [];


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

        //Creación de la casilla:
        let casilla = document.createElement('div');
        casilla.classList.add('casilla'); //esto le añade al class="casilla" de html esta clase casilla concreta, así desde css va a ser más fácil decorarlas
        casilla.setAttribute("id", `${i}`);
        casilla.innerHTML = `<input type='text' class='input_casilla' id=input_casilla_num${i}>`; //una clase para todas las casillas, un id para cada una por si acaso

        casillasLibres.push(casilla); //añadimos la casilla al array de casillas vacías
        casillero.appendChild(casilla); //añadimos la casilla al casillero

        //EventListeners:
        let inputCasilla = document.getElementById(`input_casilla_num${i}`);
        inputCasilla.addEventListener('keydown', function enterPulsado(evento){
            if(evento.key === 'Enter'){ //.key para el teclado

                //si el usuario no ha metido ni O ni S, que se ponga una de las dos letras aleatoriamente
                if(inputCasilla.value.toUpperCase() !== 'O' && inputCasilla.value.toUpperCase() !== 'S'){
                    if(Math.random() < 0.5){ //devuelve un número entre 0-1
                        inputCasilla.value = 'O';
                    }else{
                        inputCasilla.value = 'S';
                    }
                }

                comprobarOSO();

                turno++; //cambio de turno
                flujoPartida();
                
            }
        });

        casilla.addEventListener('mousedown', function clickPulsado(evento){ //el evento de 'click' solo funciona con el click izquierdo
            //.button para el ratón
            //va a poner una letra
            if(evento.button === 0){ 
                ponerLetra(casilla);
            //va a marcar OSO
            }else if(evento.button === 2){ 
                agrupacionCasillasOso(casilla);
            }
        });

        //ESTO EVITA QUE SALGA EL MENÚ CON EL CLICK DERECHO
        // Source - https://stackoverflow.com/a/737043
        // Posted by cletus, modified by community. See post 'Timeline' for change history
        // Retrieved 2026-09-21, License - CC BY-SA 3.0
        casilla.addEventListener('contextmenu', event => event.preventDefault());


    }

}

formarCasillero(tam);


//FLUJO DE PARTIDA Y TURNOS
function flujoPartida(){

    //TURNO J1
    if(turno%2 != 0){
        turnoJ1();
        console.log("TURNO P1");
    //TURNO J2
    }else{
        turnoJ2();
        console.log("TURNO P2");
    }

    if(comprobarFinPartida()){
        console.log("FIN DE PARTIDA");
        //aquí habría que poner un mensaje de victoria y que se recargue la página que seguro que se puede, y hay que se vuelva al menú
    }

}

flujoPartida();

function turnoJ1(){
    casillero.classList.add('turnoJ1'); //añade una clase y quita otra
    casillero.classList.remove('turnoJ2');
}

function turnoJ2(){
    casillero.classList.add('turnoJ2'); //añade una clase y quita otra
    casillero.classList.remove('turnoJ1');
}

function comprobarFinPartida(){
    if(casillasOcupadas.length >= (tam*tam)){
        return true;
    }else{
        false;
    }

}


//LETRAS, INPUTS, COMPROBACIÓN DE O-S-O
function ponerLetra(casilla){

    //las casillas ya ocupadas las dejamos intocables
    if(!casillasOcupadas.includes(casilla)){

        casillasOcupadas.push(casilla);

        //el color de fondo cambia según el jugador que lo haya marcado
        if(turno % 2 != 0){
            casilla.style.backgroundColor = '#326db3';
        }else{
            casilla.style.backgroundColor = '#de0029';
        }
        
    } 

}

function agrupacionCasillasOso(casilla){
    
    if(casillasOso.length < 3){

        casillasOso.push(casilla);

        if(casillasOcupadas.includes(casilla)){

            if(turno % 2 != 0){
            casilla.style.backgroundColor = '#102238';
            }else{
                casilla.style.backgroundColor = '#47000D';
            }

        }
    }

}

function comprobarOSO(){

    //CONDICIONES OSO:
    /*
    1. que el array sea de 3 casillas, no más y NO MENOS
    2. que el array contenga dos 'O' y una 'S'
    3. TODO: que estén las 3 casillas en horizontal, vertical o diagonal
    */

    if(casillasOso.length === 3){

        let l1 = casillasOso[0].querySelector('input').value;
        let l2 = casillasOso[1].querySelector('input').value;
        let l3 = casillasOso[2].querySelector('input').value;

        if(l1 === 'O' &&  l2 === 'S' && l3 === 'O'){

            if(turno % 2 != 0){
                document.getElementById('contador1').innerHTML = ++puntosJ1;
            }else{
                document.getElementById('contador2').innerHTML = ++puntosJ2;
            }

        }

    }

    casillasOso = []; //para vaciar el array para la siguiente comprobación
}

