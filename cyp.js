 /* ─────────────────────────────────────────────────────────────────
   SECCIÓN DE INTERFAZ
   ───────────────────────────────────────────────────────────────── */
 // Ocultar todas las secciones
function cambiarSeccion(idSeccion, botonActivo) {
  document.querySelectorAll('.seccion').forEach(function(s) {
    s.classList.remove('activa');
  });

  // Desactivar todos los botones
  document.querySelectorAll('.boton-tab').forEach(function(b) {
    b.classList.remove('activo');
  });

  // Activar la sección y el botón seleccionados
  let seccion = document.getElementById(idSeccion);
  if (seccion) seccion.classList.add('activa');
  if (botonActivo) botonActivo.classList.add('activo');
}

/* ─────────────────────────────────────────────────────────────────
   EMERGENTE — NOTIFICACIÓN TEMPORAL (RESULTADO CALCULADORA)
   ───────────────────────────────────────────────────────────────── */

function mostrarEmergente(mensaje, tipo) {
  let notif = document.getElementById('notificacion');
  mostrarTexto('notificacion', mensaje);
  notif.className = 'notificacion visible ' + (tipo || '');
  clearTimeout(notif._temporizador);
  notif._temporizador = setTimeout(function() {
    notif.className = 'notificacion';
  }, 4000);
}

function mostrarToast(mensaje, tipo) {
  if (tipo === 'ok') mostrarEmergente(mensaje, 'exito');
  else if (tipo === 'mal') mostrarEmergente(mensaje, 'error');
  else mostrarEmergente(mensaje, '');
}

/* ─────────────────────────────────────────────────────────────────
   gomez oscar
   ───────────────────────────────────────────────────────────────── */
   
   function calcularCostosFijos() {
    let alquiler = Number(document.getElementById("cf_alq").value) || 0;
    let servicios = Number(document.getElementById("cf_serv").value) || 0;
    let sueldos = Number(document.getElementById("cf_suel").value) || 0;

    let total = alquiler + servicios + sueldos;

    document.getElementById("res_cf").innerHTML =
    "Total de Costos Fijos: $" + total.toFixed(2);
}

function calcularCostos() {

  let directos = Number(document.getElementById("directos").value);
  let indirectos = Number(document.getElementById("indirectos").value);

  let total = directos + indirectos;

  let resultado = document.getElementById("resultadoCD");

  resultado.classList.add("visible");

  resultado.innerHTML =
    "<div class='linea'>Costo Total: $" + total.toFixed(2) + "</div>";
}

function calcularManoObra() {
    let horas = Number(document.getElementById("horas").value) || 0;
    let costo = Number(document.getElementById("costo").value) || 0;

    let total = horas * costo;

    document.getElementById("res_t5").innerHTML =
    "Costo Total de Mano de Obra: $" + total.toFixed(2);
}

function calcularGanancia() {

  let costo = Number(document.getElementById("costo").value);
  let precio = Number(document.getElementById("precio").value);

  let ganancia = precio - costo;

  let porcentaje = (ganancia / costo) * 100;

  let resultado = document.getElementById("resultadoMG");

  resultado.classList.add("visible");

  resultado.innerHTML =
    "<div class='linea'>Ganancia: $" + ganancia.toFixed(2) + "</div>" +
    "<div class='linea'>Porcentaje: " + porcentaje.toFixed(2) + "%</div>";
}

/* ─────────────────────────────────────────────────────────────────
   EVALUACIÓN 
   ───────────────────────────────────────────────────────────────── */

let quizEnviado = false;

// Respuestas correctas por pregunta (valor del radio button)
const respuestasCorrectas = {
  q1: 'c',
  q2: 'b',
  q3: 'c',
  q4: 'b',
  q5: 'c'
};

/**
 * Evalúa todas las respuestas del quiz al presionar "Evaluar".
 * Usa recuperarTexto para leer los radios mediante querySelector.
 */
function evaluarQuiz() {
  if (quizEnviado) return;

  let totalPreguntas = 5;
  let respondidas    = 0;
  let correctas      = 0;

  // Verificar que todas estén respondidas
  for (let i = 1; i <= totalPreguntas; i++) {
    let seleccionado = document.querySelector('input[name="q' + i + '"]:checked');
    if (seleccionado) respondidas++;
  }

  if (respondidas < totalPreguntas) {
    mostrarToast('Responde todas las preguntas (' + respondidas + '/' + totalPreguntas + ' respondidas).', 'mal');
    return;
  }

  quizEnviado = true;

  // Evaluar cada pregunta
  for (let i = 1; i <= totalPreguntas; i++) {
    let nombre       = 'q' + i;
    let seleccionado = document.querySelector('input[name="' + nombre + '"]:checked');
    let correcta     = respuestasCorrectas[nombre];
    let tarjeta      = document.querySelector('.tarjeta-pregunta[data-q="' + i + '"]');
    let explicacion  = document.getElementById('exp' + i);

    // Deshabilitar todos los radios de esta pregunta
    document.querySelectorAll('input[name="' + nombre + '"]').forEach(function(radio) {
      radio.disabled = true;
      let etiqueta = radio.closest('.opt');
      etiqueta.classList.add('deshabilitada');

      if (radio.value === correcta) {
        etiqueta.classList.add('correcta');
      } else if (radio.checked) {
        etiqueta.classList.add('incorrecta');
      }
    });

    if (seleccionado && seleccionado.value === correcta) {
      correctas++;
    }

    // Mostrar explicación
    if (explicacion) explicacion.hidden = false;
    if (tarjeta) tarjeta.classList.add('respondida');
  }

  // Mostrar resultado general
  let pct         = Math.round((correctas / totalPreguntas) * 100);
  let divResultado = document.getElementById('resultado-quiz');
  let tipo, mensaje;

  if (correctas === totalPreguntas) {
    tipo    = 'exito';
    mensaje = '🏆 ¡Perfecto! ' + correctas + '/' + totalPreguntas + ' correctas (' + pct + '%) — ¡Excelente dominio del tema!';
  } else if (correctas >= 3) {
    tipo    = 'parcial';
    mensaje = '👍 Buen resultado: ' + correctas + '/' + totalPreguntas + ' correctas (' + pct + '%). ¡Repasa los temas con rojo!';
  } else {
    tipo    = 'fallo';
    mensaje = '📖 Obtuviste ' + correctas + '/' + totalPreguntas + ' (' + pct + '%). Te recomendamos repasar los temas.';
  }

  // Usar mostrarTexto de cyp_utilitarios.js
  mostrarTexto('resultado-quiz', mensaje);
  if (divResultado) {
    divResultado.className = 'resultado-quiz ' + tipo;
    divResultado.hidden = false;
  }

  mostrarToast(mensaje, tipo === 'exito' ? 'ok' : tipo === 'fallo' ? 'mal' : '');
}

/**
 * Reinicia el quiz a su estado inicial.
 */
function reiniciarQuiz() {
  quizEnviado = false;

  // Desmarcar todos los radios y quitar estilos
  document.querySelectorAll('.tarjeta-pregunta input[type="radio"]').forEach(function(radio) {
    radio.checked  = false;
    radio.disabled = false;
    let etiqueta   = radio.closest('.opt');
    etiqueta.classList.remove('correcta', 'incorrecta', 'deshabilitada');
  });

  // Ocultar explicaciones
  document.querySelectorAll('.explicacion').forEach(function(e) { e.hidden = true; });
  document.querySelectorAll('.tarjeta-pregunta').forEach(function(t) { t.classList.remove('respondida'); });

  // Ocultar resultado general
  let divResultado = document.getElementById('resultado-quiz');
  if (divResultado) {
    divResultado.hidden    = true;
    divResultado.className = 'resultado-quiz';
    // Limpiar usando mostrarTexto de cyp_utilitarios.js
    mostrarTexto('resultado-quiz', '');
  }

  mostrarToast('Evaluación reiniciada. ¡Inténtalo de nuevo!', '');
}
