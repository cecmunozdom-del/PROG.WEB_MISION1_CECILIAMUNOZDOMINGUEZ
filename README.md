-Uso de IA: 
Inicialmente utilicé IA para que me resolviera dudas acerca de HTML, CSS y JS, ya que al principio había cosas de las que no me acordaba bien, o no entendía del todo. Sobre todo en este caso, sobre el funcionamiento de los eventos.
También me fue útil a la hora de formar el tablero dinámico con los inputs en cada celda. Busqué varios tutoriales y páginas web acerca del tema, pero siempre usaban métodos que no me convencían del todo, así que le pedí a Gemini que me diera un ejemplo de cómo hacerlo, y gracias a esto pude adaptarlo a mi manera en mi código.
Además, me dio la idea de que para cambiar el color de las casillas con hover según el turno del jugador, en lugar de hacer varios bucles en js, podía simplemente usar combinaciones de selectores en css, así que investigué eso por mi cuenta y es lo que acabé haciendo, ya que quedaba más limpio y ordenado, y en general son menos líneas de código.


Algunos ejemplos de prompts que he hecho:
"Una pregunta, addEventListener como va exactamente, tipo si yo quiero que todas mis casillas percibvan click derecho, click izquierdo y enter y se lo tengo que añadir a todas?"
"He puesto los addEventListener y ha desaparecido el casillero, porqué?" (Era porque los había puesto en el bucle antes de hacer el appendChild al casillero y HTML todavía no lo conocía).



-Autopsia: 
Decisión difícil 1: inputs en el tablero. No estaba segura sobre la forma de introducir 'o' y 's' en el tablero, porque la idea inicial era simplemente poner click derecho 'o' y click izquierdo 's', o viceversa, pero decidí guardar esos botones de la siguiente manera: el click derecho lo dejé para marcar casillas vacías en las que escribir, y el click izquierdo para marcar las casillas ya seleccionadas a la hora de formar 'oso'.

Decisión difícil 2: las casillas van a ser inputs o botones?