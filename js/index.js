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
//Oyentes de los eventos.
bReiniciar.addEventListener('click', reiniciarHorario, false) //Se produce al hacer click sobre el botón bReiniciar.
bGrabar.addEventListener('click', grabarDatos, false) //Se produce al hacer click sobre el botón bReiniciar.
iProfesor.addEventListener('blur', validaProfesor, false) //Se produce cuando iProfesor pierde el foco.
iAsignatura.addEventListener('blur', validaAsignatura, false) //Se produce cuando iAsignatura pierde el foco.
iProfesor.addEventListener('focus', seleccionarProfesor, false) //Se produce cuando iProfesor toma el foco.
iAsignatura.addEventListener('focus', seleccionarAsignatura, false) //Se produce cuando iAsignatura toma el foco.

//--------------------------------------------------------------------------------------------------
//Función que valida un profesor.
function validaProfesor() {
  let profesor = iProfesor.value.trim()
  //Si se ha producido la perdida del foco y la cadena está vacía, no la debe validar.
  if (profesor === '' || profesor==="El campo no puede estar vacío.") {
    return false
    //En el resto de casos valida la cadena.
  } else {
    profesor = profesor.toLowerCase().capitalize()
    //Comprueba si está incluido en el array de profesores.
    if (profesores.includes(profesor)) {
      iProfesor.value = profesor
      return true
    } else {
      //No se encuentra incluido
      iProfesor.value = 'Profesor no válido.'
      iProfesor.style.color = 'red'
    }
  }
}

//--------------------------------------------------------------------------------------------------
//Función que valida una asignatura.
function validaAsignatura() {
  let asignatura = iAsignatura.value.trim()
  //Si se ha producido la perdida del foco y la cadena está vacía, no la debe validar.
  if (asignatura === '' || asignatura==="El campo no puede estar vacío") {
    return false
    //En el resto de casos valida la cadena.
  } else {
    asignatura = asignatura.toUpperCase()
    //Comprueba si está incluida en el array de asignaturas.
    if (asignaturas.includes(asignatura)) {
      iAsignatura.value = asignatura
      return true
    } else {
      iAsignatura.value = 'Asignatura no válida.'
      iAsignatura.style.color = 'red'
    }
  }
}

//--------------------------------------------------------------------------------------------------
//Función que define el nuevo método capitalize para la clase String. Este método devuelve una cadena con la primera letra en mayúsculas y el resto en minúsculas.
String.prototype.capitalize = function () {
  let cadena = this.toString()

  if (cadena.length >= 2) {
    return (
      cadena.substring(0, 1).toUpperCase() + cadena.substring(1).toLowerCase()
    )
  } else if (cadena.length === 1) {
    return cadena.toUpperCase()
  } else {
    return ''
  }
}

//--------------------------------------------------------------------------------------------------
//Función que selecciona todo el contenido de iProfesor y cambia a negro la fuente.
function seleccionarProfesor() {
  iProfesor.value = ''
  iProfesor.select()
  iProfesor.style.color = 'black'
}

//--------------------------------------------------------------------------------------------------
//Función que selecciona todo el contenido de iAsignatura y cambia a negro la fuente.
function seleccionarAsignatura() {
  iAsignatura.value = ''
  iAsignatura.select()
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
  reiniciarCampos()
  dibujarTabla()
}

//--------------------------------------------------------------------------------------------------
//Función que graba los datos.
function grabarDatos(evt) {
  let profesor = iProfesor.value.trim()
  let asignatura = iAsignatura.value.trim()
  //Si la asignatura y el profesor son válidos.
  if (validaProfesor() && validaAsignatura()) {
    profesor=profesor.toLowerCase().capitalize()
    asignatura=asignatura.toUpperCase()
    //El profesor tiene asignada esa asignatura.
    if (profesores.indexOf(profesor) == asignaturas.indexOf(asignatura)) {
      //Crea un nuevo horario de una asignatura
      let hProfAsig = new HorarioAsignatura(
        profesor,
        asignatura,
        iDiaSemana.value,
        iHora.value,
      )

      //Crear key.
      let key = 'c' + iHora.value + iDiaSemana.value
      //console.log(key) //Clave de la celda y el map. Utilizado en depuración.
      horarioMap.set(key, hProfAsig) //Añade al map.
      celda = document.getElementById(key) //Obtenemos la celda por el id
      celda.innerText = hProfAsig.asignatura //Introduce la asignatura.
      crearOyenteClick(key) //Crea el oyente del click para esa celda.
      reiniciarCampos()
    } else {
      iAsignatura.value =
        iAsignatura.value.toUpperCase() + '. No está asignada al profesor.'
      iAsignatura.style.color = 'red'
    }
  } else {
    if (profesor === '') {
      iProfesor.value = 'El campo no puede estar vacío.'
      iProfesor.style.color = 'red'
    }
    if (asignatura === '') {
      iAsignatura.value = 'El campo no puede estar vacío.'
      iAsignatura.style.color = 'red'
    }
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

  //Crea el tbody y lo añade al cuerpo de la tabla.
  let tbody = document.createElement('tbody')
  cuerpoTabla.appendChild(tbody)
  //Bucle que genera las filas del cuerpo de la tabla.
  for (let f = 1; f <= iHora.length; f++) {
    let tr = document.createElement('tr')
    tbody.appendChild(tr)
    //Bucle que genera las celdas de una fila.
    for (let c = 0; c <= iDiaSemana.length; c++) {
      let celda = document.createElement('td') //Crea la celda
      tr.appendChild(celda) //Añade la celda a la fila.
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
//Función que crea oyente del evento click para cada una de las celdas.
function crearOyenteClick(id) {
  let celda = document.getElementById(id)
  celda.addEventListener('click', mostrarDatos, false)
}

//--------------------------------------------------------------------------------------------------
//Función que muestra los datos de una celda si se hace click en ella.
function mostrarDatos(evt) {
  //console.log(evt.target.id) //Depuración.
  let horario = horarioMap.get(evt.target.id)
  iProfesor.value = horario.profesor
  iAsignatura.value = horario.asignatura
  iDiaSemana.value = horario.diaSemana
  iHora.value = horario.hora
}

//--------------------------------------------------------------------------------------------------
//Función que inicializa los campos.
function reiniciarCampos() {
  iProfesor.value = ''
  iAsignatura.value = ''
  iDiaSemana.value = 1
  iHora.value = 1
  iProfesor.select()
}
