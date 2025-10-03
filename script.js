let consultas = [];
let farmacia = [];
let indiceEditarConsulta = -1;
let indiceEditarFarmacia = -1;

function registrarConsulta() {
  const nombre = document.getElementById('nombreConsulta').value.trim();
  const dni = document.getElementById('dniConsulta').value.trim();
  const motivo = document.getElementById('motivoConsulta').value.trim();

  if (!validarCampos(nombre, dni, motivo)) return;

  const consulta = { nombre, dni, motivo };

  if (indiceEditarConsulta === -1) {
    consultas.push(consulta);
  } else {
    if (confirm("¿Seguro que deseas guardar los cambios en esta consulta?")) {
      consultas[indiceEditarConsulta] = consulta;
    }
    indiceEditarConsulta = -1;
  }

  mostrarConsultas();
  actualizarListaPacientesFarmacia();
  limpiarCampos(['nombreConsulta', 'dniConsulta', 'motivoConsulta']);
}

function registrarFarmacia() {
  const nombre = document.getElementById('nombreFarmacia').value;
  const dni = document.getElementById('dniFarmacia').value.trim();
  const medicamento = document.getElementById('medicamento').value;

  if (!validarCampos(nombre, dni, medicamento)) return;

  const registro = { nombre, dni, medicamento };

  if (indiceEditarFarmacia === -1) {
    farmacia.push(registro);
  } else {
    if (confirm("¿Seguro que deseas guardar los cambios en esta entrega de medicamentos?")) {
      farmacia[indiceEditarFarmacia] = registro;
    }
    indiceEditarFarmacia = -1;
  }

  mostrarFarmacia();
  limpiarCampos(['nombreFarmacia', 'dniFarmacia', 'medicamento']);
  actualizarListaPacientesFarmacia();
}

function mostrarConsultas() {
  const tabla = document.getElementById('tablaConsulta');
  tabla.innerHTML = '';
  consultas.forEach((c, i) => {
    tabla.innerHTML += `<tr>
      <td>${c.nombre}</td>
      <td>${c.dni}</td>
      <td>${c.motivo}</td>
      <td>
        <button class="btn btn-warning btn-sm" onclick="editarConsulta(${i})">Editar</button>
        <button class="btn btn-danger btn-sm" onclick="eliminarConsulta(${i})">Eliminar</button>
      </td>
    </tr>`;
  });
}

function mostrarFarmacia() {
  const tabla = document.getElementById('tablaFarmacia');
  tabla.innerHTML = '';
  farmacia.forEach((f, i) => {
    tabla.innerHTML += `<tr>
      <td>${f.nombre}</td>
      <td>${f.dni}</td>
      <td>${f.medicamento}</td>
      <td>
        <button class="btn btn-warning btn-sm" onclick="editarFarmacia(${i})">Editar</button>
        <button class="btn btn-danger btn-sm" onclick="eliminarFarmacia(${i})">Eliminar</button>
      </td>
    </tr>`;
  });
}

function editarConsulta(index) {
  const c = consultas[index];
  if (confirm("¿Deseas editar esta consulta?")) {
    document.getElementById('nombreConsulta').value = c.nombre;
    document.getElementById('dniConsulta').value = c.dni;
    document.getElementById('motivoConsulta').value = c.motivo;
    indiceEditarConsulta = index;
  }
}

function editarFarmacia(index) {
  const f = farmacia[index];
  if (confirm("¿Deseas editar este registro de farmacia?")) {
    document.getElementById('nombreFarmacia').value = f.nombre;
    document.getElementById('dniFarmacia').value = f.dni;
    document.getElementById('medicamento').value = f.medicamento;
    indiceEditarFarmacia = index;
  }
}

function eliminarConsulta(index) {
  if (confirm("¿Seguro que deseas eliminar esta consulta?")) {
    consultas.splice(index, 1);
    mostrarConsultas();
    actualizarListaPacientesFarmacia();
  }
}

function eliminarFarmacia(index) {
  if (confirm("¿Seguro que deseas eliminar este registro de farmacia?")) {
    farmacia.splice(index, 1);
    mostrarFarmacia();
  }
}

function validarCampos(nombre, dni, campoExtra) {
  if (nombre === '' || dni === '' || campoExtra === '') {
    alert("Todos los campos son obligatorios.");
    return false;
  }
  if (dni.length !== 8 || isNaN(dni)) {
    alert("DNI inválido. Debe tener 8 dígitos numéricos.");
    return false;
  }
  return true;
}

function limpiarCampos(ids) {
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el.tagName === 'SELECT') {
      el.selectedIndex = 0;
    } else {
      el.value = '';
    }
  });
}

function actualizarListaPacientesFarmacia() {
  const select = document.getElementById('nombreFarmacia');
  select.innerHTML = '<option value="">Seleccione un paciente</option>';
  consultas.forEach(c => {
    const option = document.createElement('option');
    option.value = c.nombre;
    option.textContent = c.nombre;
    select.appendChild(option);
  });
}

function actualizarDniFarmacia() {
  const nombreSeleccionado = document.getElementById('nombreFarmacia').value;
  const paciente = consultas.find(c => c.nombre === nombreSeleccionado);
  document.getElementById('dniFarmacia').value = paciente ? paciente.dni : '';
}

mostrarConsultas();
mostrarFarmacia();
