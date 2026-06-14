/* ===== UTILITARIOS ===== */
function recuperaraTexto(id) {
  return document.getElementById(id).value.trim();
}
function recuperarInt(id) {
  return parseInt(recuperaraTexto(id));
}
function recuperarFloat(id) {
  return parseFloat(recuperaraTexto(id));
}
function mostrarTexto(id, msg) {
  document.getElementById(id).innerText = msg;
}
function mostrarTextoEnCaja(id, val) {
  document.getElementById(id).value = val;
}
function mostrarResultado(id, lineas) {
  var caja = document.getElementById(id);
  if (!caja) return;
  caja.innerHTML = lineas.map(function(l) { return '<div class="linea">' + l + '</div>'; }).join('');
  caja.classList.add('visible');
}
function escAttr(s) {
  return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function convertirUnidad(cantidad, desde, hacia) {
  var gramos = 0;
  switch (desde) {
    case 'g':   gramos = cantidad; break;
    case 'lb':  gramos = cantidad * 453.6; break;
    case 'kg':  gramos = cantidad * 1000; break;
    case 'unidad': return cantidad;
    default:    gramos = cantidad;
  }
  switch (hacia) {
    case 'g':   return gramos;
    case 'lb':  return gramos / 453.6;
    case 'kg':  return gramos / 1000;
    case 'unidad': return gramos;
    default:    return gramos;
  }
}
function actualizarConversor() {
  var valor = parseFloat(document.getElementById('conv_valor').value) || 0;
  var desde = document.getElementById('conv_desde').value;
  var hacia = document.getElementById('conv_hacia').value;
  var result = convertirUnidad(valor, desde, hacia);
  document.getElementById('conv_resultado').textContent = isNaN(result) ? '0' : (Number.isInteger(result) ? result : result.toFixed(4));
  var labels = ['gramos (g)','libras (lb)','kilogramos (kg)','unidad (unid)'];
  var unidades = ['g','lb','kg','unidad'];
  var desdeLabel = '';
  for (var i = 0; i < unidades.length; i++) { if (unidades[i] === desde) { desdeLabel = labels[i]; break; } }
  document.querySelectorAll('#conv_tabla tr').forEach(function(tr) {
    var idx = Array.from(tr.parentNode.children).indexOf(tr);
    var u = unidades[idx];
    if (!u) return;
    var v = convertirUnidad(valor, desde, u);
    var txt = (u === 'unidad' ? Math.round(v) : (Number.isInteger(v) ? v : v.toFixed(4))) + ' ' + (u === 'unidad' ? 'unid' : u);
    tr.innerHTML = '<td>' + valor + ' ' + desdeLabel + '</td><td>' + txt + '</td>';
  });
}
