/*Proyecto realizado por: José A. Rodríguez López-->
Fecha: 06/11/2022
*/
//--------------------------------------------------------------------------------------------------
// Declaraciones.
let horarioMap = new Map() //Map con los datos del horario.
const profesores = ['Marian', 'Alvaro', 'Fernando', 'David'] //Declaración de los profesores.
const asignaturas = ['DWES', 'DWEC', 'DI', 'DAW'] //Declaración de las asignaturas.

window.onload = () => {
  dibujarTabla();
}

//--------------------------------------------------------------------------------------------------
//Referencias de los objetos del formulario.
const bReiniciar = document.getElementById('bReiniciar')
const bGrabar = document.getElementById('bGrabar')
const iProfesor = document.getElementById('iProfesor')
const iAsignatura = document.getElementById('iAsignatura')
const iDiaSemana = document.getElementById('iDiaSemana')
const iHora = document.getElementById('iHora')

//--------------------------------------------------------------------------------------------------
//Escuchadores de los eventos.
bReiniciar.addEventListener('click', reiniciarHorario, false) //Se produce al hacer click sobre el botón bReiniciar.
bGrabar.addEventListener('click', grabarDatos, false) //Se produce al hacer click sobre el botón bReiniciar.
iProfesor.addEventListener('blur', validaProfesor, false) //Se produce cuando iProfesor pierde el foco.
iAsignatura.addEventListener('blur', validaAsignatura, false) //Se produce cuando iAsignatura pierde el foco.
iProfesor.addEventListener('focus', borrarProfesor, false) //Se produce cuando iProfesor toma el foco.
iAsignatura.addEventListener('focus', borrarAsignatura, false) //Se produce cuando iAsignatura toma el foco.

//--------------------------------------------------------------------------------------------------
//Función que valida un profesor.
function validaProfesor(evt) {
  //Si se ha producido la perdida del foco y la cadena está vacía no la debe validar.
  if (evt.type == 'blur' && iProfesor.value.trim() === '') {
    return false
    //En el resto de casos valida la cadena.
  } else {
    let profesor = iProfesor.value.trim().toLowerCase()
    profesor = profesor.trim()
    profesor = profesor.capitalize()
    if (profesores.includes(profesor)) {
      return true
    } else {
      iProfesor.value = 'Profesor incorrecto.'
      iProfesor.style.color = 'red'
      return false
    }
  }
}

//--------------------------------------------------------------------------------------------------
//Función que valida una asignatura.
function validaAsignatura(evt) {
  //Si se ha producido la perdida del foco y la cadena está vacía no la debe validar.
  if (evt.type == 'blur' && iAsignatura.value.trim() === '') {
    return false
    //En el resto de casos valida la cadena.
  } else {
    let asignatura = iAsignatura.value.trim().toUpperCase()
    if (asignaturas.includes(asignatura)) {
      return true
    } else {
      iAsignatura.value = 'Asignatura incorrecta.'
      iAsignatura.style.color = 'red'
      return false
    }
  }
}

//--------------------------------------------------------------------------------------------------
//Función que define el nuevo método capitalize para la clase String. Este método devuelve una cadena con la primera letra en mayúsculas y el resto en minúsculas.
String.prototype.capitalize = function () {
  let cadena = this.toString()
  try {
    if (cadena.length >= 2) {
      return (
        cadena.substring(0, 1).toUpperCase() + cadena.substring(1).toLowerCase()
      )
    } else if (cadena.length === 1) {
      return cadena.toUpperCase()
    }
  } catch (Exception) {
    return null
  }
}

//--------------------------------------------------------------------------------------------------
//Función que borra el contenido del iProfesor y cambia a negro la fuente.
function borrarProfesor() {
  iProfesor.value = ''
  iProfesor.style.color = 'black'
}

//--------------------------------------------------------------------------------------------------
//Función que borra el contenido del iAsignatura y cambia a negro la fuente.
function borrarAsignatura() {
  iAsignatura.value = ''
  iAsignatura.style.color = 'black'
}


//--------------------------------------------------------------------------------------------------
//Clase HorarioAsignatura.
class HorarioAsignatura {
  constructor(profesor, asignatura, diaSemana, hora) {
    this.profesor = profesor
    this.asignatura = asignatura
    this.diaSemana = diaSemana
    this.hora = hora
  }
}

//--------------------------------------------------------------------------------------------------
//Función que reinicia los datos de la tabla.
function reiniciarHorario() {
  horarioMap.clear;
  iProfesor.value=""
  iAsignatura.value=""
  iDiaSemana.value=1
  iHora.value=1
  dibujarTabla()
 }

//--------------------------------------------------------------------------------------------------
//Función que graba los datos.
function grabarDatos(evt) {
  //Atención: & simple, tiene que ejecutar las dos funciones para el marcado como incorrecto.
  if (validaProfesor(evt) & validaAsignatura(evt)) {
    //Crea un nuevo horario de una asignatura
    let hProfAsig = new HorarioAsignatura(
      iProfesor.value,
      iAsignatura.value,
      iDiaSemana.value,
      iHora.value,
    )

    //Crear key.
    let key='c'+iHora.value+iDiaSemana.value
    console.log(key)
    horarioMap.set (key, hProfAsig);
    celda=document.getElementById(key)
    celda.innerText=hProfAsig.asignatura;
    crearOyenteClick(key)
  }
}

//--------------------------------------------------------------------------------------------------
//Función que dibuja la tabla.
function dibujarTabla() {
  let cuerpoTabla = document.getElementById("tabla")
  tabla.innerText=""
  for (let f = 0; f <= iHora.length; f++) {
    //Crea una fila.
    let fila = document.createElement("tr")
    //La añade a la tabla.  
    cuerpoTabla.appendChild(fila)
    for (let c = 0; c <= iDiaSemana.length; c++) {
      //Primera fila. Elementos <th>
      if (f === 0) {
        let celda = document.createElement("th")
        //Añade el contenido.
        if (c === 0) {
          celda.innerText = 'Horario'
        } else {
          celda.innerText = iDiaSemana[c - 1].innerText
        }
        fila.appendChild(celda)
      } else {  //No es la primera fila.
        let celda = document.createElement("td")
        //Primera columna añade las horas.
        if (c === 0) {
          celda.innerText = iHora[f - 1].innerText
        } else {
          celda.id = 'c' + f + c
        }
        fila.appendChild(celda)
      }
    }
  }
}

//--------------------------------------------------------------------------------------------------
//Función que crea escuchador del evento click para cada una de las celdas.
function crearOyenteClick(id) {
  let celda = document.getElementById(id);
  celda.addEventListener('click', mostrarDatos, false);
}

//--------------------------------------------------------------------------------------------------
function mostrarDatos(evt){
  console.log(evt.target.id)
  let horario=horarioMap.get(evt.target.id)
  iProfesor.value=horario.profesor;
  iAsignatura.value=horario.asignatura;
  iDiaSemana.value=horario.diaSemana
  iHora.value=horario.hora;
}