// Función para cargar los datos de la API en la página de Stats
function cargarDatosDeAPIEnStats() {
    fetch('https://mindhub-xj03.onrender.com/api/amazing')
      .then(response => response.json())
      .then(data => {
        // Lógica para manejar los datos de la API y llenar la tabla
        llenarTablaStats(data);
      })
      .catch(error => {
        console.error('Error al obtener datos de la API', error);
      });
  }
  
  // Función para llenar la tabla de Stats con los resultados
  function llenarTablaStats(data) {
    const statsTable = document.getElementById('statsTable');
    if (statsTable) {
      // Supongamos que tienes un objeto "data.stats" con los datos necesarios
      const eventoMayorAsistencia = data.stats.eventoMayorAsistencia;
      const eventoMenorAsistencia = data.stats.eventoMenorAsistencia;
      const eventoMayorCapacidad = data.stats.eventoMayorCapacidad;
  
      // Actualiza las celdas de la tabla
      statsTable.rows[1].cells[1].textContent = eventoMayorAsistencia;
      statsTable.rows[2].cells[1].textContent = eventoMenorAsistencia;
      statsTable.rows[3].cells[1].textContent = eventoMayorCapacidad;
    }
  }
  
  // Llama a la función para cargar los datos de la API en la página de Stats
  cargarDatosDeAPIEnStats();