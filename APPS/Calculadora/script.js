let historial = [];

function registrarOperacion(operacion, resultado) {
  historial.push({ operacion, resultado });
  localStorage.setItem('calculadoraData', JSON.stringify(historial));
}

function mostrarHistorial() {
  const historialDiv = document.getElementById('historial-lista');
  historialDiv.innerHTML = '';

  if (historial.length === 0) {
    historialDiv.textContent = 'No hay operaciones registradas.';
    return;
  }

  for (const item of historial) {
    const listItem = document.createElement('li');
    listItem.textContent = `${item.operacion} = ${item.resultado}`;
    historialDiv.appendChild(listItem);
  }
}

function agregar(valor) {
  const pantalla = document.getElementById('pantalla');
  pantalla.value += valor;
}

function validarSintaxis(expresion) {
  try {
    new Function(`return ${expresion}`);
    return true;
  } catch (error) {
    return false;
  }
}

function calcular() {
  const valorPantalla = document.getElementById('pantalla').value;

  if (!validarSintaxis(valorPantalla)) {
    document.getElementById('pantalla').value = 'Error de sintaxis';
    registrarOperacion(valorPantalla, 'Operación fallida (error de sintaxis)');
    setTimeout(resetearCalculadora, 1500); 
  } else {
    try {
      const resultado = eval(valorPantalla);

      if (isNaN(resultado) || !isFinite(resultado)) {
        document.getElementById('pantalla').value = 'Error';
        registrarOperacion(valorPantalla, 'Operación fallida');
        setTimeout(resetearCalculadora, 1500); 
      } else if (resultado === Infinity || resultado === -Infinity) {
        document.getElementById('pantalla').value = 'División por cero';
        registrarOperacion(
          valorPantalla,
          'Operación fallida (división por cero)'
        );
        setTimeout(resetearCalculadora, 1500); 
      } else {
        document.getElementById('pantalla').value = resultado;
        registrarOperacion(valorPantalla, resultado);
      }
    } catch (error) {
      document.getElementById('pantalla').value = 'Error';
      registrarOperacion(valorPantalla, 'Operación fallida');
      setTimeout(resetearCalculadora, 1500); 
    }
  }

  mostrarHistorial();
}


function borrar() {
  document.getElementById('pantalla').value = '';
}

function borrarNumero() {
  var pantalla = document.getElementById('pantalla');
  pantalla.value = pantalla.value.slice(0, -1);
}

function cargarDatosGuardados() {
  const calculadoraData = localStorage.getItem('calculadoraData');

  if (calculadoraData !== null) {
    historial = JSON.parse(calculadoraData);
  }

  mostrarHistorial();
}

cargarDatosGuardados();

const botonBorrarHistorial = document.getElementById('borrar-historial');
botonBorrarHistorial.addEventListener('click', borrarHistorial);

function borrarHistorial() {
  historial = [];
  localStorage.removeItem('calculadoraData');
  mostrarHistorial();
}

let fondoNegro = true;

function cambiarColorFondo() {
  const calculadora = document.querySelector('.calculadora');
  const historial = document.querySelector('.historial');
  const botonColor = document.getElementById('cambiarColorBoton');

  fondoNegro = !fondoNegro;

  if (fondoNegro) {
    calculadora.style.backgroundColor = '#2b2b2b';
    historial.style.backgroundColor = '#2b2b2b';
    historial.style.color = '#fff';
  } else {
    calculadora.style.backgroundColor = '#fff';
    historial.style.backgroundColor = '#fff';
    historial.style.color = '#000';
  }
}

function resetearCalculadora() {
  document.getElementById('pantalla').value = '';
}


