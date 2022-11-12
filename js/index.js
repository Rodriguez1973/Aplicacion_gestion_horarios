/*Proyecto realizado por: José A. Rodríguez López-->
Fecha: 06/11/2022
*/
//--------------------------------------------------------------------------------------------------
// Declaraciones.
let horarioMap = new Map() //Map con los datos del horario.
const profesores = ['Marian', 'Fernando', 'David', 'Alvaro'] //Declaración de los profesores.
const asignaturas = ['DWES', 'DWEC', 'DI', 'DAW'] //Declaración de las asignaturas.

window.onload = () => {
  dibujarTabla()
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
  let profesor = iProfesor.value.trim()
  //Si se ha producido la perdida del foco y la cadena está vacía no la debe validar.
  if (evt.type == 'blur' && profesor === '') {
    return false
    //En el resto de casos valida la cadena.
  } else {
    profesor = profesor.toLowerCase().capitalize()
    //Comprueba si está incluido en el array de profesores.
    if (profesores.includes(profesor)) {
      return true
    } else {
      //No se encuentra incluido
      iProfesor.value = 'Profesor incorrecto.'
      iProfesor.style.color = 'red'
      return false
    }
  }
}

//--------------------------------------------------------------------------------------------------
//Función que valida una asignatura.
function validaAsignatura(evt) {
  let asignatura = iAsignatura.value.trim()
  //Si se ha producido la perdida del foco y la cadena está vacía no la debe validar.
  if (evt.type == 'blur' && asignatura === '') {
    return false
    //En el resto de casos valida la cadena.
  } else {
    asignatura = asignatura.toUpperCase()
    //Comprueba si está incluida en el array de asignaturas.
    if (asignaturas.includes(asignatura)) {
      let profesor = iProfesor.value.trim().toLowerCase().capitalize()
      if (validaProfesor(evt)) {
        //Si los indices coinciden la asignatura es de ese profesor.
        if (asignaturas.indexOf(asignatura) === profesores.indexOf(profesor)) {
          return true
        } else {
          iAsignatura.value = 'El profesor no corresponde.'
          iAsignatura.style.color = 'red'
          return false
        }
      }
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
  horarioMap.clear
  iProfesor.value = ''
  iAsignatura.value = ''
  iDiaSemana.value = 1
  iHora.value = 1
  dibujarTabla()
}

//--------------------------------------------------------------------------------------------------
//Función que graba los datos.
function grabarDatos(evt) {
  //Atención: & simple, tiene que ejecutar las dos funciones para el marcado como incorrecto.
  if (validaProfesor(evt) & validaAsignatura(evt)) {
    //Crea un nuevo horario de una asignatura
    let hProfAsig = new HorarioAsignatura(
      iProfesor.value.trim().toLowerCase().capitalize(),
      iAsignatura.value.trim().toUpperCase(),
      iDiaSemana.value,
      iHora.value,
    )

    //Crear key.
    let key = 'c' + iHora.value + iDiaSemana.value
    //console.log(key) //Clave de la celda y el map. Utilizado en depuración.
    horarioMap.set(key, hProfAsig) //Añade al map.
    celda = document.getElementById(key) //Obtenemos la celda por el id
    celda.innerText = hProfAsig.asignatura //Introduce la asignatura.
    crearOyenteClick(key) //Crea el oyente del click para esa celda
  }
}

//--------------------------------------------------------------------------------------------------
//Función que dibuja la tabla.
function dibujarTabla() {
  let cuerpoTabla = document.getElementById('tabla')
  tabla.innerText = '' //Borra la tabla.
  let thead = document.createElement('thead') //Se crea encabezado
  cuerpoTabla.appendChild(thead) //Se añade al cuerpo de la tabla.
  let trEncabezado = document.createElement('tr') //Se crea una fila.
  thead.appendChild(trEncabezado) //Se añade la fila al thead.
  //Bucle que crea los th.
  for (let c = 0; c <= iDiaSemana.length; c++) {
    let th = document.createElement('th')
    trEncabezado.appendChild(th)
    if (c === 0) {
      //Si es 0 escribe "Horario"
      th.innerText = 'Horario'
    } else {
      //Si no escribe el día de la semana que corresponde.
      th.innerText = iDiaSemana[c - 1].innerText
    }
  }

  //Creamos el tbody y lo añade al cuerpo de la tabla.
  let tbody = document.createElement('tbody')
  cuerpoTabla.appendChild(tbody)
  //Bucle que genera las filas del cuerpo de la tabla.
  for (let f = 1; f <= iHora.length; f++) {
    let tr = document.createElement('tr')
    tbody.appendChild(tr)
    //Bucle que genera las celdas.
    for (let c = 0; c <= iDiaSemana.length; c++) {
      let celda = document.createElement('td') //Crea la celda
      tr.appendChild(celda) //Añade la celda a la fila
      //Primera columna añade las horas.
      if (c === 0) {
        celda.innerText = iHora[f - 1].innerText
        //Si no es la primera columna añade el id.
      } else {
        celda.id = 'c' + f + c
        //Utilizada en depuración. Muestra el id de cada celda en ella
        //celda.innerText=celda.id
      }
    }
  }
}

//--------------------------------------------------------------------------------------------------
//Función que crea escuchador del evento click para cada una de las celdas.
function crearOyenteClick(id) {
  let celda = document.getElementById(id)
  celda.addEventListener('click', mostrarDatos, false)
}

//--------------------------------------------------------------------------------------------------
function mostrarDatos(evt) {
  console.log(evt.target.id)
  let horario = horarioMap.get(evt.target.id)
  iProfesor.value = horario.profesor
  iAsignatura.value = horario.asignatura
  iDiaSemana.value = horario.diaSemana
  iHora.value = horario.hora
}
