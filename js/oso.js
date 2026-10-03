let jugador = 1;
let puntosJ1 = 0;
let puntosJ2 = 0;

const tam = 5; //variable del tamaño del lado del tablero, para poder cambiarlo en cualquier momento
const casillero = document.getElementById('casillero');

let casillasOcupadas = [];
let casillasOSO = [];
let combinacionesOSO = [];

const body = document.body;

//FORMACIÓN DEL TABLERO
function formarCasillero(lado){
    
    //divisón en filas y columnas
    casillero.style.gridTemplateColumns = `repeat(${lado}, 1fr)`;
    casillero.style.gridTemplateRows = `repeat(${lado}, 1fr)`;

    let casillas = lado * lado;
    for(let i = 0; i < casillas; i++){
        //Creación de la casilla:
        let casilla = document.createElement('div');
        casilla.classList.add('casilla'); //esto le añade al class="casilla" de html esta clase casilla concreta, así desde css va a ser más fácil decorarlas
        casilla.setAttribute("id", `${i}`);
        casillero.appendChild(casilla); //añadimos la casilla al casillero
    }

}
formarCasillero(tam);

function adicionEventos(){

    //Click izquierdo:
    casillero.addEventListener('click', function clickPulsado(evento){ //el evento de 'click' solo funciona con el click izquierdo
    //mejor utilizar click (más estándar) porque se espera que el raton se presione y se suelte, mientras que con mousedown se hace inmediatamente
        const casilla = evento.target.closest('.casilla');
        if(!casilla) return;

        if(casillasOcupadas.includes(casilla)){
            entraEnOso(casilla);
        }else{
            ponerLetra(casilla, 'O'); //se pondrá una O
        }
    });

    //Click derecho
    casillero.addEventListener('contextmenu', function(evento){
        
        evento.preventDefault(); //esto evita que se se abra el menú

        const casilla = evento.target.closest('.casilla');
        if(!casilla) return;

        if(!casillasOcupadas.includes(casilla)) ponerLetra(casilla, 'S'); //se pondrá una S
    });


    //tecla secreta para cambio de modo oscuro/claro
    body.addEventListener('keydown', function teclaSecreta(evento){

        if (evento.repeat) return; //esto evita que se dispare múltiples veces al mantener pulsada la tecla

        //comprobamos si se ha pulsado la c, y si está activo el lightmode lo desactivamos y viceversa
        if(evento.key.toLowerCase() === 'c'){
            body.classList.toggle('lightmode');
        }

    });


}
adicionEventos();


//FLUJO DE PARTIDA Y TURNOS
function actualizarEstiloTurno(){

    if(jugador === 1){
        casillero.classList.add('turnoJ1'); //añade una clase y quita otra
        casillero.classList.remove('turnoJ2');
    }else{
        casillero.classList.add('turnoJ2'); //añade una clase y quita otra
        casillero.classList.remove('turnoJ1');
    } 

}
actualizarEstiloTurno();

function comprobarFinPartida(){
    if(casillasOcupadas.length >= (tam*tam)){
        if(puntosJ1 > puntosJ2){
            window.alert("GANADOR : JUGADOR 1");
        }else if (puntosJ2 > puntosJ1){
            window.alert("GANADOR : JUGADOR 2");
        }else{
            window.alert("EMPATE");
        }
    }
}


//LETRAS, INPUTS, COMPROBACIÓN DE O-S-O
function ponerLetra(casilla, letra){

    casilla.textContent = letra;
    casillasOcupadas.push(casilla);
    
    if(jugador === 1){
        casilla.classList.add('jugador1');
    }else{
        casilla.classList.add('jugador2');
    } 

    //después de poner la letra se pasa turno y cambia el color del hover
    jugador = (jugador === 1) ? 2 : 1;
    actualizarEstiloTurno();

    comprobarFinPartida(); //si esta casilla era la última por rellenar, termino la partida
}

function entraEnOso(casilla){
    
    if((casillasOSO.length < 3) && (casillasOcupadas.includes(casilla)) && !(casillasOSO.includes(casilla))){

        casillasOSO.push(casilla);

        if(jugador === 1){
            casilla.classList.add('seleccion-j1');
        }else{
            casilla.classList.add('seleccion-j2');
        }

        if(casillasOSO.length === 3) comprobarOSO();

    }

}

function comprobarOSO(){

    //CONDICIONES OSO:
    /*
    1. que el array sea de 3 casillas, no más y NO MENOS
    2. que el array contenga dos 'O' y una 'S'
    3. que estén alineadas las 3 casillas en horizontal, vertical o diagonal
    */

    if(casillasOSO.length === 3){

        let combinacionActual = casillasOSO.map(casilla => Number(casilla.id)).sort((a, b) => a - b); //para ordenar los valores menor a mayor
        //Es necesario el Number, porque con map, al ser de callback, lo que hace es transformar el string que devuelve id a un número

        //comprobamos que esa combinación de IDs no se haya hecho ya
        //(se pueden usar casillas de un OSO para otros OSOS, pero no el mismo otra vez)
        let existeComb = false;
        for(let i = 0; i < combinacionesOSO.length; i++){
            
            let combinacionGuardada = combinacionesOSO[i];

            if(combinacionActual[0] === combinacionGuardada[0] &&
                combinacionActual[1] === combinacionGuardada[1] &&
                combinacionActual[2] === combinacionGuardada[2])
                {
                    existeComb = true;
                    break;
                }
            
        }

        //toUpperCase para evitar errores
        let l1 = casillasOSO[0].textContent.toUpperCase();
        let l2 = casillasOSO[1].textContent.toUpperCase();
        let l3 = casillasOSO[2].textContent.toUpperCase();

        if (!existeComb && comprobarOSODimensional() && l1 === 'O' &&  l2 === 'S' && l3 === 'O'){ 

            combinacionesOSO.push(combinacionActual);

            if(jugador === 1){
                document.getElementById('contador1').textContent = `Tienes ${++puntosJ1} osos`;
            }else{
                document.getElementById('contador2').textContent = `Tienes ${++puntosJ2} osos`;
            }

            //si el OSO ha sido válido marcar las casillas en gris oscuro:
            for(let i = 0; i < casillasOSO.length; i++){
                casillasOSO[i].classList.remove('jugador1', 'jugador2', 'seleccion-j1', 'seleccion-j2');
                casillasOSO[i].classList.add('marcado-oso');       
            }
            //si no ha sido válido las devolvemos al color del player que corresponda:
        }else{
            for(let i = 0; i < casillasOSO.length; i++){
                restaurarFondo(casillasOSO[i]);
            }
        }
            

        casillasOSO.length = 0; //para vaciar el array para la siguiente comprobación

    }
    
}

//si esas 3 casillas no formaban oso, en lugar de que su fondo sea gris, volverá a ser de uno de los colores principales
function restaurarFondo(casilla){
    casilla.classList.remove('seleccion-j1', 'seleccion-j2');
}

function comprobarOSODimensional(){
    
    let id1 = casillasOSO[0].id;
    let id2 = casillasOSO[1].id;
    let id3 = casillasOSO[2].id;

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
    if(Math.abs(x3-x2) === 1 && Math.abs(x2-x1) === 1 && (Math.abs(x3-x1) === 2)){
        if(Math.abs(y3-y2) === 1 && Math.abs(y2-y1) === 1 && (Math.abs(y3-y1) === 2)){
            return true;
        }
    }

    //si se ha llegado hasta aquí es que no hay OSO
    return false;

}

