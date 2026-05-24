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
  let ingrediente1   = recuperarDecimal('mp_i1')    || 0;
  let ingrediente2   = recuperarDecimal('mp_i2')    || 0;
  let ingrediente3   = recuperarDecimal('mp_i3')    || 0;
  let porcentajeMerma= recuperarDecimal('mp_merma') || 0;

  let subtotal         = ingrediente1 + ingrediente2 + ingrediente3;
  let totalConMerma    = subtotal * (1 + porcentajeMerma / 100);

  mostrarResultadoCalculadora('res_mp', [
    'Ingrediente 1:     $' + ingrediente1.toFixed(2),
    'Ingrediente 2:     $' + ingrediente2.toFixed(2),
    'Ingrediente 3:     $' + ingrediente3.toFixed(2),
    '% Merma:           ' + porcentajeMerma.toFixed(1) + '%',
    '━━━━━━━━━━━━━━━━━━━━',
    'Subtotal:          $' + subtotal.toFixed(2),
    'Total con Merma:   <strong>$' + totalConMerma.toFixed(2) + '</strong>'
  ]);

  mostrarEmergente('Materia Prima con merma: $' + totalConMerma.toFixed(2), 'exito');
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
  // Nombres de ingredientes con recuperarTexto()
  let nombreIng1 = recuperarTexto('rec_n1') || 'Ingrediente 1';
  let nombreIng2 = recuperarTexto('rec_n2') || 'Ingrediente 2';
  let nombreIng3 = recuperarTexto('rec_n3') || 'Ingrediente 3';
  let nombreIng4 = recuperarTexto('rec_n4') || 'Ingrediente 4';

  // Costos de ingredientes con recuperarDecimal()
  let costoIng1  = recuperarDecimal('rec_c1') || 0;
  let costoIng2  = recuperarDecimal('rec_c2') || 0;
  let costoIng3  = recuperarDecimal('rec_c3') || 0;
  let costoIng4  = recuperarDecimal('rec_c4') || 0;

  let costoTotalReceta  = costoIng1 + costoIng2 + costoIng3 + costoIng4;
  let precioSugerido    = costoTotalReceta / 0.32; // Regla: costo = 32% del PVP

  let lineas = [];
  if (costoIng1 > 0) lineas.push(' ' + nombreIng1 + ':  $' + costoIng1.toFixed(2));
  if (costoIng2 > 0) lineas.push(' ' + nombreIng2 + ':  $' + costoIng2.toFixed(2));
  if (costoIng3 > 0) lineas.push(' ' + nombreIng3 + ':  $' + costoIng3.toFixed(2));
  if (costoIng4 > 0) lineas.push(' ' + nombreIng4 + ':  $' + costoIng4.toFixed(2));
  lineas.push('━━━━━━━━━━━━━━━━━━━━');
  lineas.push('💰 Costo Total Receta:    <strong>$' + costoTotalReceta.toFixed(2) + '</strong>');
  lineas.push('💡 Precio sugerido (32%): <strong>$' + precioSugerido.toFixed(2) + '</strong>');

  mostrarResultadoCalculadora('res_rec', lineas);
  mostrarEmergente('Costo de receta: $' + costoTotalReceta.toFixed(2), 'exito');
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
  let costosFijos         = recuperarDecimal('pe_cf')  || 0;
  let precioVentaUnitario = recuperarDecimal('pe_pv')  || 0;
  let costoVariableUnit   = recuperarDecimal('pe_cvu') || 0;

  let margenContribucion = precioVentaUnitario - costoVariableUnit;

  if (margenContribucion <= 0) {
    mostrarEmergente('El precio de venta debe ser mayor al costo variable unitario.', 'error');
    return;
  }
  if (costosFijos <= 0) {
    mostrarEmergente('Ingresa los costos fijos.', 'error');
    return;
  }

  let puntoEquilibrioUnidades = costosFijos / margenContribucion;
  let puntoEquilibrioDinero   = costosFijos / (1 - costoVariableUnit / precioVentaUnitario);

  mostrarResultadoCalculadora('res_pe', [
    'Costos Fijos:           $' + costosFijos.toFixed(2),
    'Precio de Venta:        $' + precioVentaUnitario.toFixed(2),
    'Costo Variable Unit.:   $' + costoVariableUnit.toFixed(2),
    'Margen de Contribución: $' + margenContribucion.toFixed(2),
    '━━━━━━━━━━━━━━━━━━━━',
    'PE en Unidades: <strong>' + Math.ceil(puntoEquilibrioUnidades) + ' unidades</strong>',
    'PE en Dinero:   <strong>$' + puntoEquilibrioDinero.toFixed(2) + '</strong>'
  ]);

  mostrarEmergente('Punto de Equilibrio: ' + Math.ceil(puntoEquilibrioUnidades) + ' unidades', 'exito');
}
