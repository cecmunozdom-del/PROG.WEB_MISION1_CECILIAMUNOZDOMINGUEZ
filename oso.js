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
    //TURNO J2
    }else{
        turnoJ2();
    }

    if(comprobarFinPartida()){
        if(puntosJ1 > puntosJ2){
            window.alert("GANADOR : JUGADOR 1");
        }else if (puntosJ2 < puntosJ1){
            window.alert("GANADOR : JUGADOR 2");
        }else{
            window.alert("EMPATE");
        }
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
        return false;
    }

}


//LETRAS, INPUTS, COMPROBACIÓN DE O-S-O
function ponerLetra(casilla){

    //en las casillas ocupadas no se pueden poner nuevas letras
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
    3. que estén las 3 casillas en horizontal, vertical o diagonal
    */

    if(casillasOso.length === 3){

        let l1 = casillasOso[0].querySelector('input').value.toUpperCase();
        let l2 = casillasOso[1].querySelector('input').value.toUpperCase();
        let l3 = casillasOso[2].querySelector('input').value.toUpperCase();

        if((l1 === 'O' &&  l2 === 'S' && l3 === 'O') && comprobarOSODimensional()){

            if(turno % 2 !== 0){
                document.getElementById('contador1').innerHTML = `Tienes ${++puntosJ1} osos`;
            }else{
                document.getElementById('contador2').innerHTML = `Tienes ${++puntosJ2} osos`;
            }

            //si el OSO ha sido válido marcar las casillas en gris oscuro:
            for(let i = 0; i < casillasOso.length; i++){
                casillasOso[i].style.backgroundColor = '#3D3D3D';
            }
        }

        casillasOso.length = 0; //para vaciar el array para la siguiente comprobación

    }
    
}

function comprobarOSODimensional(){
    
    let id1 = casillasOso[0].id;
    let id2 = casillasOso[1].id;
    let id3 = casillasOso[2].id;

    //lo pasamos a coordenadas (cociente me dice la fila y resto la columna)
    let x1 = Math.floor(id1 / tam);
    let y1 = id1 % tam;
    let x2 = Math.floor(id2 / tam);
    let y2 = id2 % tam;
    let x3 = Math.floor(id3 / tam);
    let y3 = id3 % tam;

    //en horizontal -> la fila es igual y la columna difiere de 1
    if(x1 === x2 && x2 === x3){
        if(Math.abs(y3-y2) === 1 && Math.abs(y2-y1) === 1){
            return true;
        }
    }

    //en vertical -> la columna es la misma y d
    if(y1 === y2 && y2 === y3){
        if(Math.abs(x3-x2) === 1 && Math.abs(x2-x1) === 1){
            return true;
        }
    }

    //en diagonal -> las diferencias de filas y columnas es de 1
    if(Math.abs(x3-x2) === 1 && Math.abs(x2-x1) === 1){
        if(Math.abs(y3-y2) === 1 && Math.abs(y2-y1) === 1){
            return true;
        }
    }

    //si se ha llegado hasta aquí es que no hay OSO
    return false;

}