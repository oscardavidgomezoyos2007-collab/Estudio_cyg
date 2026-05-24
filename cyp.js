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
function calcularCostosFijos() {

  let alquiler = Number(document.getElementById("alquiler").value);
  let internet = Number(document.getElementById("internet").value);
  let seguro = Number(document.getElementById("seguro").value);

  let total = alquiler + internet + seguro;

  let resultado = document.getElementById("resultadoCF");

  resultado.classList.add("visible");

  resultado.innerHTML =
    "<div class='linea'>Costo Fijo Total: $" + total.toFixed(2) + "</div>";
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

  let empleados = Number(document.getElementById("empleados").value);
  let salario = Number(document.getElementById("salario").value);

  let total = empleados * salario;

  let resultado = document.getElementById("resultadoMO");

  resultado.classList.add("visible");

  resultado.innerHTML =
    "<div class='linea'>Costo Mano de Obra: $" + total.toFixed(2) + "</div>";
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