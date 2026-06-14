/* ===== T1 · COSTOS FIJOS ===== */
function calcularCostosFijos() {
  var alquiler  = recuperarFloat('cf_alq') || 0;
  var servicios = recuperarFloat('cf_serv') || 0;
  var sueldos   = recuperarFloat('cf_suel') || 0;
  if (alquiler <= 0 && servicios <= 0 && sueldos <= 0) {
    alert('Ingresa al menos un valor.');
    return;
  }
  var total = alquiler + servicios + sueldos;
  mostrarResultado('res_cf', [
    'Alquiler:     $' + alquiler.toFixed(2),
    'Servicios:    $' + servicios.toFixed(2),
    'Sueldos:      $' + sueldos.toFixed(2),
    '\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501',
    'Total Costos Fijos: <strong>$' + total.toFixed(2) + '</strong>'
  ]);
  alert('Costos Fijos: $' + total.toFixed(2));
}

/* ===== T2 · COSTOS VARIABLES ===== */
function calcularCostosVariables() {
  var costoUnit = recuperarFloat('cv_cvu') || 0;
  var cantidad  = recuperarInt('cv_cant') || 0;
  if (costoUnit <= 0 || cantidad <= 0) { alert('Ingresa valores v\u00e1lidos mayores a 0.'); return; }
  var total = costoUnit * cantidad;
  mostrarResultado('res_cv', [
    'Costo unitario:   $' + costoUnit.toFixed(2),
    'Cantidad:         ' + cantidad + ' unidades',
    '\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501',
    'Costo Variable Total: <strong>$' + total.toFixed(2) + '</strong>'
  ]);
  alert('Costo Variable Total: $' + total.toFixed(2));
}

/* ===== T3 · DIRECTOS E INDIRECTOS ===== */
function calcularDirectosIndirectos() {
  var directos   = recuperarFloat('ci_dir') || 0;
  var indirectos = recuperarFloat('ci_ind') || 0;
  var total = directos + indirectos;
  mostrarResultado('res_ci', [
    'Costos Directos:   $' + directos.toFixed(2),
    'Costos Indirectos: $' + indirectos.toFixed(2),
    '\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501',
    'Costo Total: <strong>$' + total.toFixed(2) + '</strong>'
  ]);
  alert('Costo Total: $' + total.toFixed(2));
}

/* ===== T4 · MATERIA PRIMA ===== */
function calcularMateriaPrima() {
  var i1    = recuperarFloat('mp_i1') || 0;
  var i2    = recuperarFloat('mp_i2') || 0;
  var i3    = recuperarFloat('mp_i3') || 0;
  var merma = recuperarFloat('mp_merma') || 0;
  var subtotal = i1 + i2 + i3;
  var total    = subtotal * (1 + merma / 100);
  mostrarResultado('res_mp', [
    'Ingrediente 1:     $' + i1.toFixed(2),
    'Ingrediente 2:     $' + i2.toFixed(2),
    'Ingrediente 3:     $' + i3.toFixed(2),
    '% Merma:           ' + merma.toFixed(1) + '%',
    '\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501',
    'Subtotal:          $' + subtotal.toFixed(2),
    'Total con Merma:   <strong>$' + total.toFixed(2) + '</strong>'
  ]);
  alert('Materia Prima con merma: $' + total.toFixed(2));
}

/* ===== T5 · MANO DE OBRA ===== */
function calcularManoObra() {
  var horas = recuperarFloat('mo_horas') || 0;
  var costo = recuperarFloat('mo_costo') || 0;
  if (horas <= 0 || costo <= 0) { alert('Ingresa valores v\u00e1lidos.'); return; }
  var total = horas * costo;
  mostrarResultado('res_mo', [
    'Horas trabajadas: ' + horas,
    'Costo por hora:   $' + costo.toFixed(2),
    '\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501',
    'Costo Mano de Obra: <strong>$' + total.toFixed(2) + '</strong>'
  ]);
  alert('Mano de Obra: $' + total.toFixed(2));
}

/* ===== T6 · COSTEO DE RECETAS ===== */
function calcularReceta() {
  var n1 = recuperaraTexto('rec_n1') || 'Ingrediente 1';
  var n2 = recuperaraTexto('rec_n2') || 'Ingrediente 2';
  var n3 = recuperaraTexto('rec_n3') || 'Ingrediente 3';
  var n4 = recuperaraTexto('rec_n4') || 'Ingrediente 4';
  var c1 = recuperarFloat('rec_c1') || 0;
  var c2 = recuperarFloat('rec_c2') || 0;
  var c3 = recuperarFloat('rec_c3') || 0;
  var c4 = recuperarFloat('rec_c4') || 0;
  var total  = c1 + c2 + c3 + c4;
  var precio = total / 0.32;
  var lineas = [];
  if (c1 > 0) lineas.push(' ' + n1 + ':  $' + c1.toFixed(2));
  if (c2 > 0) lineas.push(' ' + n2 + ':  $' + c2.toFixed(2));
  if (c3 > 0) lineas.push(' ' + n3 + ':  $' + c3.toFixed(2));
  if (c4 > 0) lineas.push(' ' + n4 + ':  $' + c4.toFixed(2));
  lineas.push('\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501');
  lineas.push('\ud83d\udcb0 Costo Total Receta:    <strong>$' + total.toFixed(2) + '</strong>');
  lineas.push('\ud83d\udca1 Precio sugerido (32%): <strong>$' + precio.toFixed(2) + '</strong>');
  mostrarResultado('res_rec', lineas);
  alert('Costo de receta: $' + total.toFixed(2));
}

/* ===== T7 · MARGEN DE GANANCIA ===== */
function calcularMargenGanancia() {
  var costo  = recuperarFloat('mg_costo') || 0;
  var precio = recuperarFloat('mg_precio') || 0;
  if (costo <= 0 || precio <= 0) { alert('Ingresa valores v\u00e1lidos.'); return; }
  if (precio <= costo) { alert('El precio debe ser mayor al costo.'); return; }
  var ganancia = precio - costo;
  var margen   = (ganancia / precio) * 100;
  mostrarResultado('res_mg', [
    'Costo:        $' + costo.toFixed(2),
    'Precio:       $' + precio.toFixed(2),
    'Ganancia:     $' + ganancia.toFixed(2),
    '\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501',
    'Margen: <strong>' + margen.toFixed(2) + '%</strong>'
  ]);
  alert('Margen: ' + margen.toFixed(2) + '%');
}

/* ===== T8 · PUNTO DE EQUILIBRIO ===== */
function calcularPuntoEquilibrio() {
  var cf  = recuperarFloat('pe_cf') || 0;
  var pv  = recuperarFloat('pe_pv') || 0;
  var cvu = recuperarFloat('pe_cvu') || 0;
  var mc = pv - cvu;
  if (mc <= 0) { alert('El precio de venta debe ser mayor al costo variable unitario.'); return; }
  if (cf <= 0) { alert('Ingresa los costos fijos.'); return; }
  var peUnidades = cf / mc;
  var peDinero   = cf / (1 - cvu / pv);
  mostrarResultado('res_pe', [
    'Costos Fijos:           $' + cf.toFixed(2),
    'Precio de Venta:        $' + pv.toFixed(2),
    'Costo Variable Unit.:   $' + cvu.toFixed(2),
    'Margen de Contribuci\u00f3n: $' + mc.toFixed(2),
    '\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501',
    'PE en Unidades: <strong>' + Math.ceil(peUnidades) + ' unidades</strong>',
    'PE en Dinero:   <strong>$' + peDinero.toFixed(2) + '</strong>'
  ]);
  alert('Punto de Equilibrio: ' + Math.ceil(peUnidades) + ' unidades');
}

/* ===== GUARDAR DATOS AL SIMULADOR ===== */
function enviarAlSimulador(tema) {
  var count = 0;
  function copiar(de, para) {
    var el = document.getElementById(de);
    var target = document.getElementById(para);
    if (el && target) { target.value = el.value; count++; }
  }
  switch (tema) {
    case 't1':
      copiar('cf_alq','sim_cf_alq'); copiar('cf_serv','sim_cf_serv'); copiar('cf_suel','sim_cf_suel');
      break;
    case 't2':
      copiar('cv_cvu','sim_cv_cvu'); copiar('cv_cant','sim_cv_cant');
      break;
    case 't3':
      copiar('ci_dir','sim_ci_dir'); copiar('ci_ind','sim_ci_ind');
      break;
    case 't4': {
      var nombres = ['Ingrediente 1','Ingrediente 2','Ingrediente 3'];
      var ids = ['mp_i1','mp_i2','mp_i3'];
      var merma = parseFloat(document.getElementById('mp_merma')?.value) || 0;
      var tabla = document.getElementById('tabla-mp');
      if (tabla) {
        tabla.querySelectorAll('.fila-sim').forEach(function(f) { f.remove(); });
        for (var i = 0; i < 3; i++) {
          var val = parseFloat(document.getElementById(ids[i])?.value) || 0;
          if (val > 0) {
            var div = document.createElement('div');
            div.className = 'fila-sim';
            div.innerHTML =
              '<input type="text" class="sim-mp-nombre" value="' + nombres[i] + '" oninput="actualizarCostoXUnidad(this)" />' +
              '<select class="sim-mp-unidad" onchange="actualizarCostoXUnidad(this)"><option value="lb">lb</option><option value="kg">kg</option><option value="qq">qq</option><option value="unidad">unid</option></select>' +
              '<input type="number" class="sim-mp-cant" value="1" step="0.01" oninput="actualizarCostoXUnidad(this)" />' +
              '<input type="number" class="sim-mp-precio" value="' + val.toFixed(2) + '" step="0.01" oninput="actualizarCostoXUnidad(this)" />' +
              '<input type="number" class="sim-mp-merma" value="' + merma.toFixed(1) + '" step="1" oninput="actualizarCostoXUnidad(this)" />' +
              '<span class="sim-mp-costo-x-unidad">$0.00</span>' +
              '<span class="sim-mp-acciones"><button class="btn-peligro" onclick="modificarFilaMP(this)" title="Modificar">\u270f\ufe0f</button><button class="btn-peligro" onclick="eliminarFilaMP(this)" title="Eliminar">\ud83d\uddd1\ufe0f</button></span>';
            tabla.appendChild(div);
            actualizarCostoXUnidad(div);
            count++;
          }
        }
        actualizarListaMP();
      }
      break;
    }
    case 't5':
      copiar('mo_horas','sim_mo_horas'); copiar('mo_costo','sim_mo_costo');
      break;
    case 't6':
      copiar('rec_n1','sim_nombre');
      break;
    case 't7': {
      var costo = parseFloat(document.getElementById('mg_costo')?.value) || 0;
      var precio = parseFloat(document.getElementById('mg_precio')?.value) || 0;
      if (costo > 0 && precio > costo) {
        var margen = ((precio - costo) / precio) * 100;
        var target = document.getElementById('sim_margen');
        if (target) { target.value = margen.toFixed(1); count++; }
      }
      break;
    }
    case 't8':
      copiar('pe_cf','sim_cf_alq'); copiar('pe_pv','sim_prod_pv');
      break;
  }
  if (count > 0) {
    alert('Datos guardados en el Simulador (' + count + ' campos).');
  } else {
    alert('Completa los campos primero.');
  }
}
