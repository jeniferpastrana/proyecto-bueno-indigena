//total preguntas del juego
const TOTAL_PREGUNTAS = 10;
//tiempo del juego
const TIEMPO_DEL_JUEGO = 20;
//estructura para almacenar las preguntas
const bd_juego = [
  {
      id:'A',
      pregunta:"vivien en la Sierra Nevada de Santa Marta",
      respuesta:"Arhuacos"
  },
  {
    id:'k',
    pregunta:"Principalmente en la región de La Guajira, en el norte de Colombia",
    respuesta:"Wayuu"
  },
  {
    id:'C',
    pregunta:"Nombre de la memoria que almacena temporalmente los datos de la computadora",
    respuesta:"cache"
  },
  {
    id:'D',
    pregunta:"Archivo que controla los periféricos que se conectan a la computadora",
    respuesta:"driver"
  },
  {
    id:'E',
    pregunta:"Mezclar los datos para protegerlos como medida de seguridad, es decir, convertir texto normal a texto cifrado",
    respuesta:"encriptar"
  },
  {
    id:'F',
    pregunta:"Famosa red social cread por Mark Zuckerberg",
    respuesta:"facebook"
  },
  {
    id:'G',
    pregunta:"Lenguaje de programación crado por Google",
    respuesta:"go"
  },
  {
    id:'H',
    pregunta:"lenguaje utilizado para la estructura a las páginas web",
    respuesta:"html"
  },
  {
    id:'I',
    pregunta:"Aspecto que presentan los programas tras su ejecución mediante el cual ejercemos la comunicación con éstos",
    respuesta:"interfaz"
  },
  {
    id:'J',
    pregunta:"Lenguaje de programación con el cual se diseño el sistema operativo Android",
    respuesta:"java"
  },
]

//preguntas que ya han sido contestadas. Si estan en 0 no han sido contestadas
let estadoPreguntas = [0,0,0,0,0,0,0,0,0,0]
let cantidadAcertadas = 0;

//variable que mantiene el num de pregunta acual
let numPreguntaActual = -1;

// Obtener el elemento del cronómetro
const timer = document.getElementById("tiempo");
// Establecer el tiempo inicial en 60 segundos
let timeLeft = TIEMPO_DEL_JUEGO;
let countdown;

//boton comenzar
let comenzar = document.getElementById("comenzar");
const responder = document.getElementById("responder")
const respuesta = document.getElementById("respuesta")
//botón para pasar de pregunta sin contestar
let pasar = document.getElementById("pasar");


responder.addEventListener("click", ()=>{
 console.log(
  bd_juego[numPreguntaActual].respuesta.toLocaleLowerCase() == respuesta.value.toLocaleLowerCase());

  if ( bd_juego[numPreguntaActual].respuesta.toLocaleLowerCase() == respuesta.value.toLocaleLowerCase()) {
    cantidadAcertadas++
  }

  pasar.click()


  // mostrarPantallaFinal()
})

comenzar.addEventListener("click", function(event) {
  document.getElementById("pantalla-inicial").style.display = "none";
  document.getElementById("pantalla-juego").style.display = "block";
  largarTiempo();
  cargarPregunta();
});

//Creamos el circúlo con las letras de la A a la Z
const caja = document.querySelector(".caja");
for (let i = 1; i <= TOTAL_PREGUNTAS; i++) {
  const circle = document.createElement("div");
  circle.classList.add("circle");
  circle.textContent = String.fromCharCode(i + 96);
  circle.id = String.fromCharCode(i + 96).toUpperCase();
  caja.appendChild(circle);

  const angle = ((i - 1) / TOTAL_PREGUNTAS) * Math.PI * 2 - (Math.PI / 2);
  const x = Math.round(95 + 120 * Math.cos(angle));
  const y = Math.round(95 + 120 * Math.sin(angle));
  circle.style.left = `${x}px`;
  circle.style.top = `${y}px`;
}


//Función que carga la pregunta
function cargarPregunta(){
  numPreguntaActual++;
  //controlo si he llegado al final de las preguntas, para comenzar de nuevo
  if(numPreguntaActual>=TOTAL_PREGUNTAS){
    numPreguntaActual=0;
  }

  if(estadoPreguntas.indexOf(0)>=0){ //Controlo que todavía hallan preguntas por contestar
    while(estadoPreguntas[numPreguntaActual]==1){
      numPreguntaActual++;
      if(numPreguntaActual>=TOTAL_PREGUNTAS){
        numPreguntaActual=0;
      }
    }
  
    document.getElementById("letra-pregunta").textContent = bd_juego[numPreguntaActual].id
    document.getElementById("pregunta").textContent = bd_juego[numPreguntaActual].pregunta
    let letra =  bd_juego[numPreguntaActual].id;
    document.getElementById("letra-pregunta").classList.add("pregunta-actual");
  }
  else{
    clearInterval(countdown);
    mostrarPantallaFinal();
  }

}

//detecto cada vez que hay un cambio de tecla en el input

respuesta.addEventListener("keyup", function(event) {
  //detecto si la tecla presionada es ENTER
  if (event.keyCode === 13) {
    if(respuesta.value==""){
      alert("Debe ingresar un valor!!");
      return;
    }
    //obtengo la respuesta ingresada
    let txtRespuesta = respuesta.value;
    controlarRespuesta(txtRespuesta.toLowerCase());
  }
});

//Función que controla la respuesta
function controlarRespuesta(txtRespuesta){
  //controlo si la respuesta es correcta
  if(txtRespuesta == bd_juego[numPreguntaActual].respuesta){
    //alert("Respuesta correcta")
    cantidadAcertadas++;

    //actualizo el estado de las pregunta actual a 1, indicando que ya esta respondida
    estadoPreguntas[numPreguntaActual] = 1;
    let letra =  bd_juego[numPreguntaActual].id;
    document.getElementById("letra-pregunta").classList.remove("pregunta-actual");
    document.getElementById("letra-pregunta").classList.add("bien-respondida");

  }else{
    //alert("respuesta incorrecta")
    //actualizo el estado de las pregunta actual a 1, indicando que ya esta respondida
    estadoPreguntas[numPreguntaActual] = 1;
    let letra =  bd_juego[numPreguntaActual].id;
    //quito l clase del estilo de pregunta actual
    document.getElementById("letra-pregunta").classList.remove("pregunta-actual");
    //agrego la clase del estilo de pregunta mal respondida
    document.getElementById("letra-pregunta").classList.add("mal-respondida");

  }
  respuesta.value="";
  cargarPregunta();
}



pasar.addEventListener("click", function(event) {
  let letra =  bd_juego[numPreguntaActual].id;
  console.log(letra);

  cargarPregunta();
});


// Crear la función que se encargará de actualizar el cronómetro cada segundo
function largarTiempo(){
  countdown = setInterval(() => {
    // Restar un segundo al tiempo restante
    timeLeft--;
  
    // Actualizar el texto del cronómetro con el tiempo restante
    timer.innerText = timeLeft;
  
    // Si el tiempo llega a 0, detener el cronómetro
    if (timeLeft < 0) {
      clearInterval(countdown);
      mostrarPantallaFinal();
    }
  }, 1000);
}

//muestro la pantlla final
function mostrarPantallaFinal(){
  document.getElementById("acertadas").textContent = cantidadAcertadas;
  document.getElementById("score").textContent = (cantidadAcertadas*100)/10 + "% de acierto";
  document.getElementById("pantalla-juego").style.display =  "none";
  document.getElementById("pantalla-final").style.display =  "block";
}

//boton para recomenzar el juego
let recomenzar = document.getElementById("recomenzar");
recomenzar.addEventListener("click", function(event) {
  numPreguntaActual = -1;
  timeLeft = TIEMPO_DEL_JUEGO;
  timer.innerText = timeLeft;
  cantidadAcertadas = 0;
  estadoPreguntas = [0,0,0,0,0,0,0,0,0,0];

  //quito las clases de los circulos
  let circulos = document.getElementsByClassName("circle");
  for(i=0;i<circulos.length;i++){
    circulos[i].classList.remove("bien-respondida");
    circulos[i].classList.remove("mal-respondida");
  }

  document.getElementById("pantalla-final").style.display = "none";
  document.getElementById("pantalla-juego").style.display = "block";
  largarTiempo();
  cargarPregunta();
});



const panels = document.querySelectorAll('.panel')

panels.forEach(panel => {
    panel.addEventListener('click', () => {
        removeActiveClases()
        panel.classList.add('active')
    })
})


function removeActiveClases() {
    panels.forEach(panel => {
        panel.classList.remove('active')
    })
}



