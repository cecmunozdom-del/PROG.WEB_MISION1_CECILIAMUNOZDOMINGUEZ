# OSO

Misión M1 · El Despertar del DOM — Web Development I.

## Cómo probarlo
Abre menuoso.html en el navegador (o con Live Server) y pulsa Jugar. La tecla secreta para el modo oscuro (en este caso modo claro) es la 'c'.

## Uso de IA
Usé Gemini como soporta a la hora de programar. Inicialmente lo usé para que me resolviera dudas acerca de HTML, CSS y JS, ya que al principio había cosas de las que no me acordaba bien, o no entendía del todo. De HTML y de CSS tampoco le consulté mucho, aunque sí que me ayudó a corregir errores de CSS en cosas específicas que no me funcionaban bien ("esto me gustaría que saliese en el centro y no así", "he añadido esta parte de código y ahora esto otro se ha movido o ya no se ve", etc). 

Y al comienzo del proyecto lo usé para resolver muchas dudas que tenía con JS sobre el funcionamiento de los eventos. También me fue útil a la hora de formar el tablero dinámico con los inputs en cada celda. Busqué varios tutoriales y páginas web acerca del tema, pero siempre usaban métodos que no me convencían del todo, así que le pedí a Gemini que me diera un ejemplo de cómo hacerlo, y gracias a esto pude adaptarlo a mi manera en mi código. Además, me dio la idea de que para cambiar el color de las casillas con hover según el turno del jugador, en lugar de hacer varios bucles en js, podía simplemente usar combinaciones de selectores en css, así que investigué eso por mi cuenta y es lo que acabé haciendo, ya que quedaba más limpio y ordenado, y en general son menos líneas de código.

Cuando estaba ya terminando de programar la lógica del juego, vi que tal como estaba hecho el código, se permitía seleccionar el mismo "oso" una y otra vez y acumular puntos infinitos, así que para solucionarlo se me ocurrió que podía crear una matriz que me guardase los ids de las casillas de 3 en 3 y revisase que no se volvía a repetir la misma combinación otra vez en toda la partida. Gemini me fue muy útil en esta parte resolviendo dudas, por ejemplo, me recalcó que era importante que los ordenase, y al intentar hacerlo con map y sort como habíamos visto en clase, me corrigió ya que los ids de las casillas eran strings y por tanto debía usar Number(casilla.id) para que funcionase como yo quería.

También destacar que para varias partes del código (como para el modo oscuro) he buscado en webs y he visto tutoriales en Youtube, aunque también me he asegurado de no incluir nada que no entendiera en mi trabajo. Por ejemplo, para el modo claro y oscuro, usé IA para que me explicara bien cómo funcionaba localStorage con setItem, y el porqué es mejor usar 'inactive' que null (ya que localStorage recibe un string y poner null puede dar lugar a problemas).

Durante estos últimos días antes de la fecha final de entrega, he usado Gemini para encontrar errores en mi código, resolver problemas que no estaba siendo capaz de solucionar sola, y corregir algunos problemas de organización del código (WebArena es insistente con no repetir código). 

Algunos ejemplos de prompts que he hecho a lo largo del trabajo:
"Una pregunta, addEventListener como funciona exactamente?, por ejemplo si yo quiero que todas mis casillas perciban click derecho, click izquierdo y enter y se lo tengo que añadir a todas?" Al principio lo hice así pensando que tenía que añadir un listener a cada casilla, pero después de verlo en clase lo cambié ya que solo neceistaba un listener para todo el tablero y luego podía saber qué casilla había sido seleccionada con evento.target.closest.

"Te paso mi código de JS para que me digas porqué no aumentan los puntos de los jugadores al marcar OSO". Era porque no lo estaba pasando a UpperCase y eso al parecer no lo reconocía como 0 - S - O.

"Si se guardan los ids ordenados en el array de menor a mayor, porqué me sigue dejando seleccionar siempre el mismo OSO?" Era porque en la condición del if había varios parámetros, y con el operador || solo comprobaba que el primero era cierto, ignoraba el resto. Para que funcionase bien simplemente cambié de orden los parámetros, poniendo primeramente !existeComb && comprobarOSODimensional() para que lo primero que tuviera en cuenta el programa es si ya existía esa combinación o no.


## Autopsia
1. No estaba segura sobre la forma de introducir 'o' y 's' en el tablero. Mi idea original era utilizar click izquierdo para la 'O' y el derecho para las 'S', pero me parecía que sería demasiado complicado calcular la selección del o-s-o de esa forma. Inicialmente el click derecho lo dejé para marcar casillas vacías en las que escribir (metiendo un input de texto en cada una de las casillas) y el click izquierdo para marcar las casillas ya seleccionadas a la hora de formar 'oso'. Pero después de que algunos de mis compañeros probaran el juego, me dijeron que igual sería buena idea cambiarlo a la otra manera. Por ello, modifiqué algunos eventos, automaticé el cambio de turno (que antes era pulsando la tecla 'enter'), y cambié un poco la lógica para finalmente dejarlo como está. Ahora cada click pone una letra en la casilla, y si se quiere marcar oso, se deben pulsar casillas que ya tengan letra puesta.

2. ¿Cómo averiguo si el OSO ha sido puesto en horizontal, vertical, o diagonal? No sabía muy bien cómo enfrentar esta parte del trabajo, así que Gemini me ayudó a comparar las diferentes formas que había para hacerlo. Principalmente eran 2, una de ellas calculando las coordenadas de cada letra dentro del casillero gracias a sus ids (el cociente me dice la fila y el resto la columna), y la otra calculando simplemente la diferencia que había entre las casillas (si estaban en horizontal diferían de 1, si estaban en vertical diferían en 10...). Finalmente decidí intentar la primera opción, ya que era más segura con respecto a los bordes del casillero (podía confundir el final de una fila con la siguiente, ya que son dos números seguidos en ids), y además comprobé que era escalable a cualquier tamaño que le quisiera poner al tablero.
