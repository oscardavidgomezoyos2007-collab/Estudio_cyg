/* ===== NAVEGACIÓN ===== */
function cambiarSeccion(idSeccion, botonActivo) {
  var ids = ['t1','t2','t3','t4','t5','t6','t7','t8','simulador','evaluacion','acerca-de'];
  ids.forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.classList.remove('activa');
  });
  var seccion = document.getElementById(idSeccion);
  if (seccion) seccion.classList.add('activa');
  if (botonActivo) {
    document.querySelectorAll('nav button').forEach(function(b) { b.classList.remove('activo'); });
    botonActivo.classList.add('activo');
  }
}
function mostrarSeccion(id) {
  var btn = null;
  document.querySelectorAll('nav button').forEach(function(b) {
    if (b.getAttribute('onclick') && b.getAttribute('onclick').indexOf(id) !== -1) btn = b;
  });
  cambiarSeccion(id, btn);
}

/* ===== SIMULADOR · INVENTARIO ===== */
var _mpEditRow = null;

function actualizarCostoXUnidad(el) {
  var fila = el.closest('.fila-sim');
  if (!fila) return;
  var cant   = parseFloat(fila.querySelector('.sim-mp-cant')?.value) || 0;
  var precio = parseFloat(fila.querySelector('.sim-mp-precio')?.value) || 0;
  var merma  = parseFloat(fila.querySelector('.sim-mp-merma')?.value) || 0;
  var span   = fila.querySelector('.sim-mp-costo-x-unidad');
  if (cant > 0 && precio > 0) {
    var factor = 1 - merma / 100;
    var util   = cant * factor;
    var costo  = util > 0 ? precio / util : 0;
    span.textContent = '$' + costo.toFixed(2);
  } else {
    span.textContent = '$0.00';
  }
}

function guardarInventario() {
  var datos = [];
  document.querySelectorAll('#tabla-mp .fila-sim').forEach(function(f) {
    var nombre = f.querySelector('.sim-mp-nombre').value.trim();
    if (nombre) {
      datos.push({
        nombre: nombre,
        unidad: f.querySelector('.sim-mp-unidad').value,
        cant:   f.querySelector('.sim-mp-cant').value,
        precio: f.querySelector('.sim-mp-precio').value,
        merma:  f.querySelector('.sim-mp-merma').value
      });
    }
  });
  window._simInventario = datos;
  alert('Inventario guardado (' + datos.length + ' productos).');
}

function abrirModalMP(fila) {
  _mpEditRow = fila || null;
  var titulo = document.getElementById('modal-mp-titulo');
  titulo.textContent = _mpEditRow ? 'Editar Producto' : 'Nuevo Producto';
  if (_mpEditRow) {
    document.getElementById('modal-mp-nombre').value = _mpEditRow.querySelector('.sim-mp-nombre').value;
    document.getElementById('modal-mp-unidad').value = _mpEditRow.querySelector('.sim-mp-unidad').value;
    document.getElementById('modal-mp-cant').value = _mpEditRow.querySelector('.sim-mp-cant').value;
    document.getElementById('modal-mp-precio').value = _mpEditRow.querySelector('.sim-mp-precio').value;
    document.getElementById('modal-mp-merma').value = _mpEditRow.querySelector('.sim-mp-merma').value;
  } else {
    document.getElementById('modal-mp-nombre').value = '';
    document.getElementById('modal-mp-unidad').value = 'lb';
    document.getElementById('modal-mp-cant').value = '';
    document.getElementById('modal-mp-precio').value = '';
    document.getElementById('modal-mp-merma').value = '';
  }
  document.getElementById('modal-mp-error').style.display = 'none';
  document.getElementById('modal-mp').classList.add('open');
}

function cerrarModalMP(event) {
  if (event && event.target !== event.currentTarget) return;
  document.getElementById('modal-mp').classList.remove('open');
  _mpEditRow = null;
}

function guardarModalMP() {
  var nombre = document.getElementById('modal-mp-nombre').value.trim();
  var unidad = document.getElementById('modal-mp-unidad').value;
  var cant   = document.getElementById('modal-mp-cant').value;
  var precio = document.getElementById('modal-mp-precio').value;
  var merma  = document.getElementById('modal-mp-merma').value;
  var errEl  = document.getElementById('modal-mp-error');
  if (!nombre) { errEl.textContent = 'Ingresa el nombre del producto.'; errEl.style.display = 'block'; return; }
  if (!cant || parseFloat(cant) <= 0) { errEl.textContent = 'Ingresa una cantidad v\u00e1lida.'; errEl.style.display = 'block'; return; }
  if (!precio || parseFloat(precio) <= 0) { errEl.textContent = 'Ingresa un precio v\u00e1lido.'; errEl.style.display = 'block'; return; }
  errEl.style.display = 'none';
  if (_mpEditRow) {
    _mpEditRow.querySelector('.sim-mp-nombre').value = nombre;
    _mpEditRow.querySelector('.sim-mp-unidad').value = unidad;
    _mpEditRow.querySelector('.sim-mp-cant').value = cant;
    _mpEditRow.querySelector('.sim-mp-precio').value = precio;
    _mpEditRow.querySelector('.sim-mp-merma').value = merma;
    actualizarCostoXUnidad(_mpEditRow);
  } else {
    var tabla = document.getElementById('tabla-mp');
    var div = document.createElement('div');
    div.className = 'fila-sim';
    div.innerHTML =
      '<input type="text" class="sim-mp-nombre" value="' + escAttr(nombre) + '" oninput="actualizarCostoXUnidad(this)" />' +
      '<select class="sim-mp-unidad" onchange="actualizarCostoXUnidad(this)">' +
        '<option value="lb"' + (unidad === 'lb' ? ' selected' : '') + '>lb</option>' +
        '<option value="kg"' + (unidad === 'kg' ? ' selected' : '') + '>kg</option>' +
        '<option value="qq"' + (unidad === 'qq' ? ' selected' : '') + '>qq</option>' +
        '<option value="unidad"' + (unidad === 'unidad' ? ' selected' : '') + '>unid</option>' +
      '</select>' +
      '<input type="number" class="sim-mp-cant" value="' + escAttr(cant) + '" step="0.01" oninput="actualizarCostoXUnidad(this)" />' +
      '<input type="number" class="sim-mp-precio" value="' + escAttr(precio) + '" step="0.01" oninput="actualizarCostoXUnidad(this)" />' +
      '<input type="number" class="sim-mp-merma" value="' + escAttr(merma) + '" step="1" oninput="actualizarCostoXUnidad(this)" />' +
      '<span class="sim-mp-costo-x-unidad">$0.00</span>' +
      '<span class="sim-mp-acciones">' +
        '<button class="btn-peligro" onclick="modificarFilaMP(this)" title="Modificar">\u270f\ufe0f</button>' +
        '<button class="btn-peligro" onclick="eliminarFilaMP(this)" title="Eliminar">\ud83d\uddd1\ufe0f</button>' +
      '</span>';
    tabla.appendChild(div);
    actualizarCostoXUnidad(div);
  }
  actualizarListaMP();
  cerrarModalMP();
}

function eliminarFilaMP(boton) {
  if (!confirm('\u00bfEliminar este producto del inventario?')) return;
  var fila = boton.closest('.fila-sim');
  if (fila) fila.remove();
  actualizarListaMP();
}

function modificarFilaMP(boton) {
  var fila = boton.closest('.fila-sim');
  if (!fila) return;
  abrirModalMP(fila);
}

function agregarFilaReceta() {
  var tabla = document.getElementById('tabla-receta');
  var div = document.createElement('div');
  div.className = 'fila-sim';
  div.innerHTML =
    '<select class="sim-rec-select"><option value="">\u2014 Seleccionar \u2014</option></select>' +
    '<input type="number" class="sim-rec-cant" placeholder="100" step="0.01" />' +
    '<select class="sim-rec-unidad">' +
      '<option value="g">g</option>' +
      '<option value="lb">lb</option>' +
      '<option value="kg">kg</option>' +
      '<option value="unidad">unid</option>' +
    '</select>' +
    '<button class="btn-peligro" onclick="eliminarFilaReceta(this)" title="Eliminar">\ud83d\uddd1\ufe0f</button>';
  tabla.appendChild(div);
  poblarSelectIngredientes(div.querySelector('.sim-rec-select'), '');
}

function eliminarFilaReceta(boton) {
  if (!confirm('\u00bfEliminar este ingrediente de la receta?')) return;
  var fila = boton.closest('.fila-sim');
  if (fila) fila.remove();
}

function poblarSelectIngredientes(select, valorSeleccionado) {
  select.innerHTML = '<option value="">\u2014 Seleccionar \u2014</option>';
  var filas = document.querySelectorAll('#tabla-mp .fila-sim');
  var yaVistos = {};
  filas.forEach(function(f) {
    var nombre = f.querySelector('.sim-mp-nombre').value.trim();
    if (nombre && !yaVistos[nombre]) {
      yaVistos[nombre] = true;
      var opt = document.createElement('option');
      opt.value = nombre;
      opt.textContent = nombre;
      if (nombre === valorSeleccionado) opt.selected = true;
      select.appendChild(opt);
    }
  });
}

function actualizarListaMP() {
  var selects = document.querySelectorAll('.sim-rec-select');
  selects.forEach(function(sel) { poblarSelectIngredientes(sel, sel.value); });
}

/* ===== SIMULADOR · ACCIONES POR SECCIÓN ===== */
function guardarSim(boton) {
  var simBox = boton.closest('.sim-box');
  var inputs = simBox.querySelectorAll('input, select, textarea');
  var datos = {};
  inputs.forEach(function(inp) {
    if (inp.id) datos[inp.id] = inp.value;
    if (inp.tagName === 'INPUT' || inp.tagName === 'TEXTAREA') inp.disabled = true;
  });
  var nombre = simBox.querySelector('h4')?.textContent?.trim() || 'sección';
  localStorage.setItem('sim_' + (simBox.dataset.section || Date.now()), JSON.stringify(datos));
}

function editarSim(boton) {
  var simBox = boton.closest('.sim-box');
  var key = 'sim_' + simBox.dataset.section;
  var saved = localStorage.getItem(key);
  if (saved) {
    var datos = JSON.parse(saved);
    Object.keys(datos).forEach(function(id) {
      var el = document.getElementById(id);
      if (el) el.value = datos[id];
    });
  }
  simBox.querySelectorAll('input:disabled, select:disabled, textarea:disabled').forEach(function(inp) {
    inp.disabled = false;
  });
}

function limpiarSim(boton) {
  if (!confirm('¿Borrar todos los campos de esta sección?')) return;
  var simBox = boton.closest('.sim-box');
  var key = 'sim_' + simBox.dataset.section;
  localStorage.removeItem(key);
  simBox.querySelectorAll('input[type="text"], input[type="number"], textarea').forEach(function(inp) {
    if (!inp.id || inp.id !== 'res_pe_valor') inp.value = '';
  });
  simBox.querySelectorAll('select').forEach(function(sel) { sel.selectedIndex = 0; });
}

/* ===== SIMULADOR · GUARDAR / SELECCIONAR ===== */
function guardarReceta() {
  var recetaNombre = document.getElementById('sim_nombre')?.value?.trim();
  if (!recetaNombre) {
    alert('Primero ingresa un nombre en T6 · Nombre de la Receta.');
    return;
  }
  var key = 'receta_' + Date.now();
  var data = {
    _nombre:    recetaNombre,
    nombre:     recetaNombre,
    tiempo:     document.getElementById('sim_tiempo')?.value || '',
    porciones:  document.getElementById('sim_porciones')?.value || '',
    mo:         document.getElementById('sim_mo')?.value || '',
    indirectos: document.getElementById('sim_indirectos')?.value || '',
    margen:     document.getElementById('sim_margen')?.value || '',
    cf_alq:     document.getElementById('sim_cf_alq')?.value || '',
    cf_serv:    document.getElementById('sim_cf_serv')?.value || '',
    cf_suel:    document.getElementById('sim_cf_suel')?.value || '',
    cv_cvu:     document.getElementById('sim_cv_cvu')?.value || '',
    cv_cant:    document.getElementById('sim_cv_cant')?.value || '',
    ci_dir:     document.getElementById('sim_ci_dir')?.value || '',
    ci_ind:     document.getElementById('sim_ci_ind')?.value || '',
    mo_horas:   document.getElementById('sim_mo_horas')?.value || '',
    mo_costo:   document.getElementById('sim_mo_costo')?.value || '',
    prod_nombre: document.getElementById('sim_prod_nombre')?.value || '',
    prod_desc:  document.getElementById('sim_prod_desc')?.value || '',
    prod_cat:   document.getElementById('sim_prod_cat')?.value || '',
    prod_pv:    document.getElementById('sim_prod_pv')?.value || '',
    mp:         [],
    receta:     []
  };
  document.querySelectorAll('#tabla-mp .fila-sim').forEach(function(f) {
    data.mp.push({
      nombre: f.querySelector('.sim-mp-nombre').value.trim(),
      unidad: f.querySelector('.sim-mp-unidad').value,
      cant:   f.querySelector('.sim-mp-cant').value,
      precio: f.querySelector('.sim-mp-precio').value,
      merma:  f.querySelector('.sim-mp-merma').value
    });
  });
  document.querySelectorAll('#tabla-receta .fila-sim').forEach(function(f) {
    data.receta.push({
      nombre: f.querySelector('.sim-rec-select').value,
      cant:   f.querySelector('.sim-rec-cant').value,
      unidad: f.querySelector('.sim-rec-unidad').value
    });
  });
  window._simEstadoReceta = data;
  localStorage.setItem(key, JSON.stringify(data));
  var lista = JSON.parse(localStorage.getItem('receta_lista') || '[]');
  lista.push(key);
  localStorage.setItem('receta_lista', JSON.stringify(lista));
  cargarListaRecetas();
  alert('Receta guardada: ' + recetaNombre);
}

function cargarListaRecetas() {
  var dd = document.getElementById('dropdown-recetas');
  if (!dd) return;
  dd.innerHTML = '';
  var lista = JSON.parse(localStorage.getItem('receta_lista') || '[]');
  lista.forEach(function(key) {
    var saved = localStorage.getItem(key);
    if (!saved) return;
    try {
      var data = JSON.parse(saved);
      var nombre = data._nombre || data.nombre || key;
      var item = document.createElement('div');
      item.style.cssText = 'display:flex;align-items:center;padding:8px 12px;cursor:pointer;border-bottom:1px solid #f0f0f0';
      item.onmouseover = function(){ this.style.background = '#f5f5f5'; };
      item.onmouseout = function(){ this.style.background = ''; };
      var span = document.createElement('span');
      span.style.cssText = 'flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap';
      span.textContent = nombre;
      span.onclick = function(){ seleccionarReceta(key); };
      item.appendChild(span);
      var del = document.createElement('button');
      del.textContent = '\ud83d\uddd1\ufe0f';
      del.title = 'Eliminar';
      del.style.cssText = 'border:none;background:none;cursor:pointer;font-size:14px;padding:2px 6px;border-radius:4px';
      del.onmouseover = function(){ this.style.background = '#ffe0e0'; };
      del.onmouseout = function(){ this.style.background = ''; };
      del.onclick = function(e){ e.stopPropagation(); eliminarReceta(key); };
      item.appendChild(del);
      dd.appendChild(item);
    } catch(e) {}
  });
  if (!lista.length) {
    dd.innerHTML = '<div style="padding:12px;color:#999;font-size:0.85rem">No hay recetas guardadas</div>';
  }
}

function toggleListaRecetas() {
  var dd = document.getElementById('dropdown-recetas');
  if (!dd) return;
  dd.style.display = dd.style.display === 'none' ? 'block' : 'none';
}

document.addEventListener('click', function(e) {
  var sel = document.getElementById('receta-selector');
  var dd = document.getElementById('dropdown-recetas');
  if (sel && dd && !sel.contains(e.target)) dd.style.display = 'none';
});

function seleccionarReceta(key) {
  var saved = localStorage.getItem(key);
  if (!saved) return;
  var data = JSON.parse(saved);
  window._simEstadoReceta = data;
  restaurarReceta();
  document.getElementById('dropdown-recetas').style.display = 'none';
}

function eliminarReceta(key) {
  if (!confirm('¿Eliminar esta receta?')) return;
  localStorage.removeItem(key);
  var lista = JSON.parse(localStorage.getItem('receta_lista') || '[]');
  lista = lista.filter(function(k){ return k !== key; });
  localStorage.setItem('receta_lista', JSON.stringify(lista));
  cargarListaRecetas();
}

/* ===== SIMULADOR · RESTAURAR RECETA ===== */
function restaurarReceta() {
  var est = window._simEstadoReceta;
  if (!est) {
    var t0Saved = localStorage.getItem('sim_t0');
    if (t0Saved) {
      var raw = JSON.parse(t0Saved);
      est = {};
      for (var k in raw) {
        if (k.indexOf('sim_') === 0) est[k.substring(4)] = raw[k];
        else est[k] = raw[k];
      }
      window._simEstadoReceta = est;
    } else {
      return;
    }
  }
  var t0Box = document.querySelector('.sim-box[data-section="t0"]');
  if (t0Box) {
    var t0Body = t0Box.querySelector('.sim-body');
    if (t0Body) t0Body.style.display = '';
    var t0Head = t0Box.querySelector('h4');
    if (t0Head && t0Head.textContent.indexOf('\u25b7') === 0) t0Head.textContent = '\u25b6 ' + t0Head.textContent.substring(2);
  }
  var ids = ['sim_nombre','sim_tiempo','sim_porciones','sim_mo','sim_indirectos','sim_margen',
    'sim_cf_alq','sim_cf_serv','sim_cf_suel','sim_cv_cvu','sim_cv_cant',
    'sim_ci_dir','sim_ci_ind','sim_mo_horas','sim_mo_costo',
    'sim_prod_nombre','sim_prod_desc','sim_prod_cat','sim_prod_pv'];
  var keys = ['nombre','tiempo','porciones','mo','indirectos','margen',
    'cf_alq','cf_serv','cf_suel','cv_cvu','cv_cant',
    'ci_dir','ci_ind','mo_horas','mo_costo',
    'prod_nombre','prod_desc','prod_cat','prod_pv'];
  for (var i = 0; i < ids.length; i++) {
    var el = document.getElementById(ids[i]);
    if (el) el.value = est[keys[i]] || '';
  }
  var tablaMP = document.getElementById('tabla-mp');
  if (tablaMP) {
    tablaMP.querySelectorAll('.fila-sim').forEach(function(f) { f.remove(); });
    (est.mp || []).forEach(function(d) {
      var div = document.createElement('div');
      div.className = 'fila-sim';
      div.innerHTML =
        '<input type="text" class="sim-mp-nombre" value="' + escAttr((d.nombre||'').trim()) + '" oninput="actualizarCostoXUnidad(this)" />' +
        '<select class="sim-mp-unidad" onchange="actualizarCostoXUnidad(this)">' +
          '<option value="lb"' + (d.unidad === 'lb' ? ' selected' : '') + '>lb</option>' +
          '<option value="kg"' + (d.unidad === 'kg' ? ' selected' : '') + '>kg</option>' +
          '<option value="qq"' + (d.unidad === 'qq' ? ' selected' : '') + '>qq</option>' +
          '<option value="unidad"' + (d.unidad === 'unidad' ? ' selected' : '') + '>unid</option>' +
        '</select>' +
        '<input type="number" class="sim-mp-cant" value="' + escAttr(d.cant) + '" step="0.01" oninput="actualizarCostoXUnidad(this)" />' +
        '<input type="number" class="sim-mp-precio" value="' + escAttr(d.precio) + '" step="0.01" oninput="actualizarCostoXUnidad(this)" />' +
        '<input type="number" class="sim-mp-merma" value="' + escAttr(d.merma) + '" step="1" oninput="actualizarCostoXUnidad(this)" />' +
        '<span class="sim-mp-costo-x-unidad">$0.00</span>' +
        '<span class="sim-mp-acciones">' +
          '<button class="btn-peligro" onclick="modificarFilaMP(this)" title="Modificar">\u270f\ufe0f</button>' +
          '<button class="btn-peligro" onclick="eliminarFilaMP(this)" title="Eliminar">\ud83d\uddd1\ufe0f</button>' +
        '</span>';
      tablaMP.appendChild(div);
      actualizarCostoXUnidad(div);
    });
  }
  actualizarListaMP();
  var tablaRec = document.getElementById('tabla-receta');
  if (tablaRec) {
    tablaRec.querySelectorAll('.fila-sim').forEach(function(f) { f.remove(); });
    (est.receta || []).forEach(function(d) {
      if (!d.nombre) return;
      var div = document.createElement('div');
      div.className = 'fila-sim';
      div.innerHTML =
        '<select class="sim-rec-select"></select>' +
        '<input type="number" class="sim-rec-cant" value="' + escAttr(d.cant) + '" step="0.01" />' +
        '<select class="sim-rec-unidad">' +
          '<option value="g"' + (d.unidad === 'g' ? ' selected' : '') + '>g</option>' +
          '<option value="lb"' + (d.unidad === 'lb' ? ' selected' : '') + '>lb</option>' +
          '<option value="kg"' + (d.unidad === 'kg' ? ' selected' : '') + '>kg</option>' +
          '<option value="unidad"' + (d.unidad === 'unidad' ? ' selected' : '') + '>unid</option>' +
        '</select>' +
        '<button class="btn-peligro" onclick="eliminarFilaReceta(this)" title="Eliminar">\ud83d\uddd1\ufe0f</button>';
      tablaRec.appendChild(div);
      poblarSelectIngredientes(div.querySelector('.sim-rec-select'), d.nombre);
    });
  }
}

/* ===== SIMULADOR · COSTEO INTEGRADO ===== */
function simularCosteo() {
  var nombreProducto = document.getElementById('sim_prod_nombre')?.value || '';
  var nombreReceta   = document.getElementById('sim_nombre')?.value || 'Receta sin nombre';
  var tiempoMin      = parseFloat(document.getElementById('sim_tiempo')?.value) || 0;
  var porciones      = parseFloat(document.getElementById('sim_porciones')?.value) || 1;
  if (porciones <= 0) porciones = 1;

  var cfAlquiler  = parseFloat(document.getElementById('sim_cf_alq')?.value) || 0;
  var cfServicios = parseFloat(document.getElementById('sim_cf_serv')?.value) || 0;
  var cfSueldos   = parseFloat(document.getElementById('sim_cf_suel')?.value) || 0;
  var totalCF     = cfAlquiler + cfServicios + cfSueldos;

  var cvCostoUnit = parseFloat(document.getElementById('sim_cv_cvu')?.value) || 0;
  var cvCantidad  = parseFloat(document.getElementById('sim_cv_cant')?.value) || 0;
  var totalCV_Indep = cvCostoUnit * cvCantidad;

  var ciDirectos   = parseFloat(document.getElementById('sim_ci_dir')?.value) || 0;
  var ciIndirectos = parseFloat(document.getElementById('sim_ci_ind')?.value) || 0;
  var pctIndirectos = parseFloat(document.getElementById('sim_indirectos')?.value) || 0;

  var mpLista = [];
  document.querySelectorAll('#tabla-mp .fila-sim').forEach(function(f) {
    var nombre = f.querySelector('.sim-mp-nombre').value.trim();
    var unidad = f.querySelector('.sim-mp-unidad').value;
    var cant   = parseFloat(f.querySelector('.sim-mp-cant')?.value) || 0;
    var precio = parseFloat(f.querySelector('.sim-mp-precio')?.value) || 0;
    var merma  = parseFloat(f.querySelector('.sim-mp-merma')?.value) || 0;
    if (nombre && cant > 0 && precio > 0) {
      var factor = 1 - merma / 100;
      var util   = cant * factor;
      mpLista.push({ nombre: nombre, unidad: unidad, cantComprada: cant, precio: precio, merma: merma, cantUtil: util, costoXUnidad: util > 0 ? precio / util : 0 });
    }
  });
  if (mpLista.length === 0) { alert('Registra al menos una materia prima en el inventario.'); return; }

  var costoMOxHora = parseFloat(document.getElementById('sim_mo')?.value) || 0;
  var ingredientes = [];
  document.querySelectorAll('#tabla-receta .fila-sim').forEach(function(f) {
    var select = f.querySelector('.sim-rec-select');
    var nombre = select ? select.value.trim() : '';
    var cant   = parseFloat(f.querySelector('.sim-rec-cant')?.value) || 0;
    var unidad = f.querySelector('.sim-rec-unidad').value;
    if (nombre && cant > 0) ingredientes.push({ nombre: nombre, cantidad: cant, unidad: unidad });
  });
  if (ingredientes.length === 0) { alert('Agrega al menos un ingrediente a la receta.'); return; }

  var costoTotalMP = 0;
  ingredientes.forEach(function(ing) {
    var match = null;
    for (var i = 0; i < mpLista.length; i++) {
      if (mpLista[i].nombre.toLowerCase() === ing.nombre.toLowerCase()) { match = mpLista[i]; break; }
    }
    if (!match) return;
    var cantConv = convertirUnidad(ing.cantidad, ing.unidad, match.unidad);
    costoTotalMP += match.costoXUnidad * cantConv;
  });

  var horasMO_Receta  = tiempoMin / 60;
  var costoMO_Receta  = costoMOxHora * horasMO_Receta;
  var totalIndirectos = (costoTotalMP + costoMO_Receta) * (pctIndirectos / 100);
  var costoProduccion = costoTotalMP + costoMO_Receta + totalIndirectos;
  var costoPorPorc    = costoProduccion / porciones;

  var pctMargen  = Math.min(parseFloat(document.getElementById('sim_margen')?.value) || 0, 99.9);
  var precioSug  = pctMargen > 0 ? costoProduccion / (1 - pctMargen / 100) : costoProduccion;
  var ganancia   = precioSug - costoProduccion;
  var margenReal = precioSug > 0 ? (ganancia / precioSug) * 100 : 0;

  var peUnidades = 0, peDinero = 0;
  var margenContribucion = precioSug - costoPorPorc;
  if (margenContribucion > 0 && totalCF > 0) {
    peUnidades = totalCF / margenContribucion;
    peDinero   = totalCF / (1 - costoPorPorc / precioSug);
  }

  var gananciaReal = precioSug - costoProduccion;
  var gEl = document.getElementById('res_ganancia_real');
  if (gEl) gEl.textContent = '$' + gananciaReal.toFixed(2);
  var el = document.getElementById('res_ingresos_valor');
  if (el) el.textContent = '$' + precioSug.toFixed(2) + ' / $' + (peDinero > 0 ? peDinero.toFixed(2) : '0.00');
  el = document.getElementById('res_egresos_valor');
  if (el) el.textContent = '$' + costoProduccion.toFixed(2) + ' / $' + (costoPorPorc > 0 ? costoPorPorc.toFixed(2) : '0.00');
  el = document.getElementById('res_ganancia_valor');
  if (el) { el.textContent = '$' + ganancia.toFixed(2); el.style.color = ganancia >= 0 ? '#155724' : '#c0392b'; }
  el = document.getElementById('res_unidades_valor');
  if (el) el.textContent = '1 lote / ' + (peUnidades > 0 ? Math.ceil(peUnidades) + ' unid.' : 'N/A');
  el = document.getElementById('res_crecimiento_valor');
  if (el) { el.textContent = (margenReal >= 0 ? '+' : '') + margenReal.toFixed(1) + '%'; el.style.color = margenReal >= 0 ? '#155724' : '#c0392b'; }

  var peEl = document.getElementById('res_pe_valor');
  if (peEl) peEl.value = peDinero > 0 ? '$' + peDinero.toFixed(2) : '\u2014';

  alert('$' + costoProduccion.toFixed(2) + ' \u00b7 $' + costoPorPorc.toFixed(2) + '/porci\u00f3n');
}

/* ===== COLLAPSIBLE ===== */
function toggleCollapsible(el) {
  var simBox = el.closest('.sim-box');
  if (!simBox) return;
  var body = simBox.querySelector('.sim-body');
  if (body) {
    if (body.style.display === 'none') {
      body.style.display = 'block';
      el.textContent = '\u25b6 ' + el.textContent.substring(2);
    } else {
      body.style.display = 'none';
      el.textContent = '\u25b7 ' + el.textContent.substring(2);
    }
  }
}

/* ===== EVALUACIÓN ===== */
function evaluarQuiz() {
  var preguntas = [1,2,3,4,5];
  var correctas = 0;
  var total = preguntas.length;
  preguntas.forEach(function(q) {
    var seleccionado = document.querySelector('input[name="q' + q + '"]:checked');
    var exp = document.getElementById('exp' + q);
    if (seleccionado) {
      var opt = seleccionado.closest('label') || seleccionado.parentElement;
      var esCorrecta = seleccionado.getAttribute('data-correct') === 'true' ||
        opt.querySelector('[data-correct="true"]') === seleccionado;
      var realCorrecta = document.querySelector('input[name="q' + q + '"][data-correct="true"]');
      if (seleccionado === realCorrecta) {
        correctas++;
        if (exp) { exp.style.display = 'block'; exp.style.background = '#d4edda'; exp.style.color = '#155724'; }
      } else {
        if (exp) {
          exp.style.display = 'block';
          exp.style.background = '#f8d7da';
          exp.style.color = '#721c24';
          exp.innerHTML = '\u274c Incorrecto. La respuesta correcta era otra.';
          if (realCorrecta && realCorrecta.closest) {
            var realLabel = realCorrecta.closest('label');
            if (realLabel) realLabel.style.background = '#d4edda';
          }
        }
        if (seleccionado.closest('label')) seleccionado.closest('label').style.background = '#f8d7da';
      }
    } else {
      if (exp) { exp.style.display = 'block'; exp.style.background = '#fff3cd'; exp.style.color = '#856404'; exp.innerHTML = '\u26a0\ufe0f No respondiste esta pregunta.'; }
    }
  });
  var nota = Math.round((correctas / total) * 100);
  var resultadoDiv = document.getElementById('resultado-quiz');
  resultadoDiv.style.display = 'block';
  var nivel = nota >= 80 ? '\uD83C\uDF1F Excelente' : nota >= 60 ? '\uD83D\uDC4D Bien' : '\uD83D\uDCA1 Sigue practicando';
  resultadoDiv.className = 'resultado visible';
  resultadoDiv.innerHTML = '<strong>' + correctas + '/' + total + ' correctas (' + nota + '%)</strong> \u2014 ' + nivel;
  resultadoDiv.style.background = nota >= 60 ? '#d4edda' : '#f8d7da';
  resultadoDiv.style.color = nota >= 60 ? '#155724' : '#721c24';
}

function reiniciarQuiz() {
  [1,2,3,4,5].forEach(function(q) {
    var radios = document.querySelectorAll('input[name="q' + q + '"]');
    radios.forEach(function(r) { r.checked = false; if (r.closest('label')) r.closest('label').style.background = ''; });
    var exp = document.getElementById('exp' + q);
    if (exp) exp.style.display = 'none';
  });
  document.getElementById('resultado-quiz').style.display = 'none';
}

/* ===== INICIO ===== */
(function() {
  var btn = document.querySelector('nav button[onclick*="t1"]');
  cambiarSeccion('t1', btn);
  setTimeout(actualizarConversor, 100);
  cargarListaRecetas();
})();
