# APLICACIÓN WEB PARA LA GESTIÓN DE HORARIOS.
Objetivo: Crear una aplicación que permita crear objetos por medio de una function en javascript.<br> 
Cada objeto tendrá las siguientes propiedades :<br>
NombreProfesor<br>
NombreAsignatura<br>
DiaSemana<br>
HoraDelDia<br>
<br>
Los objetos creados se guardaran en un Map en memoria.<br>
// Declarar el Map<br>
var horarioMap = new Map();<br>
// Grabar en el MAP<br>
var hProfAsig = new horarioAsignatura(cNombre.value, cAsignatura.value, columna, fila);<br>
// Leer del Map por clave<br>
var key = this.id;<br>
horariocelda = horarioMap.get(key);<br>
horarioMap.set("c" + fila + columna, hProfAsig);<br>
<br>
Los datos de los objetos se introducirán desde cajas de texto&lt;input type =”text”&gt;(NombreProfesor y NombreAsignatura) y por medio de elementos &lt;select&gt; DiaSemana y HoraDelDia.<br>
<br>
Se verificará que el nombre de los profesores solo pueden ser: Marian, David,  Alvaro o Fernando.<br>
Los nombres de las asignaturas serán DWES, DWEC , DI y DAW.<br>
En la &lt;select&gt; de DiaSemana se crearan &lt;option&gt; de los días lunes, martes, miércoles, jueves y viernes.<br>
En la &lt;select&gt; de HoraDelDia se crearan &lt;option&gt; de 8, 9, 10 ,11:30 y 12:30.<br>
	
Además desde el menú de la aplicación tenemos que generar una tabla en la que se visualizará el horario creado.<br>

Cuando se grabe un horario se visualizará en la celda correspondiente de la tabla (&lt;td&gt; de un objeto &lt;table&gt;).<br>
Cuando hagamos click sobre uno de estos &lt;td&gt;, leeremos del Map los datos de la celda y los visualizaremos sobre las cajas de texto &lt;input type=”text”&gt; y los &lt;select&gt;<br>