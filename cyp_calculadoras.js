/* ─────────────────────────────────────────────────────────────────
   FUNCIONES AUXILIARES
   ───────────────────────────────────────────────────────────────── */
function mostrarResultadoCalculadora(idCaja, lineas) {
  let caja = document.getElementById(idCaja);
  if (!caja) return;
  caja.innerHTML = lineas.map(function(linea) {
    return '<div class="linea">' + linea + '</div>';
  }).join('');
  caja.classList.add('visible');
}

/* ─────────────────────────────────────────────────────────────────
   TEMA 1 — COSTOS FIJOS
   ───────────────────────────────────────────────────────────────── */
function calcularCostosFijos() {
  
}

/* ─────────────────────────────────────────────────────────────────
   TEMA 2 — COSTOS VARIABLES
   ───────────────────────────────────────────────────────────────── */
function calcularCostosVariables() {
  let costoUnitario = recuperarDecimal('cv_cvu')  || 0;
  let cantidad      = recuperarEntero('cv_cant')  || 0;

  if (costoUnitario <= 0 || cantidad <= 0) {
    mostrarEmergente('Ingresa valores válidos mayores a 0.', 'error');
    return;
  }

  let totalCostoVariable = costoUnitario * cantidad;

  mostrarResultadoCalculadora('res_cv', [
    'Costo unitario:   $' + costoUnitario.toFixed(2),
    'Cantidad:         ' + cantidad + ' unidades',
    '━━━━━━━━━━━━━━━━━━━━',
    'Costo Variable Total: <strong>$' + totalCostoVariable.toFixed(2) + '</strong>'
  ]);

  mostrarEmergente('Costo Variable Total: $' + totalCostoVariable.toFixed(2), 'exito');
}

/* ─────────────────────────────────────────────────────────────────
   TEMA 3 — COSTOS DIRECTOS E INDIRECTOS
   ───────────────────────────────────────────────────────────────── */
function calcularDirectosIndirectos() {

}

/* ─────────────────────────────────────────────────────────────────
   TEMA 4 — MATERIA PRIMA
   ───────────────────────────────────────────────────────────────── */
function calcularMateriaPrima() {

}

/* ─────────────────────────────────────────────────────────────────
   TEMA 5 — MANO DE OBRA
   ───────────────────────────────────────────────────────────────── */
function calcularManoObra() {

}

/* ─────────────────────────────────────────────────────────────────
   TEMA 6 — COSTEO DE RECETAS
   ───────────────────────────────────────────────────────────────── */
function calcularReceta() {

}

/* ─────────────────────────────────────────────────────────────────
   TEMA 7 — MARGEN DE GANANCIA
   ───────────────────────────────────────────────────────────────── */
function calcularMargenGanancia() {

}

/* ─────────────────────────────────────────────────────────────────
   TEMA 8 — PUNTO DE EQUILIBRIO
   ───────────────────────────────────────────────────────────────── */
function calcularPuntoEquilibrio() {

}
