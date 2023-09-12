document.addEventListener("DOMContentLoaded", function () {
  const contenedorEventos = document.getElementById("contenedorEventos");
  const categoryFilter = document.getElementById("category-filter");

  let data = null; // Variable para almacenar los datos de la API

  function fetchDataFromAPI() {
    return fetch('https://mindhub-xj03.onrender.com/api/amazing') // Reemplaza la URL con la correcta
      .then((response) => {
        if (!response.ok) {
          throw new Error('No se pudo obtener la data de la API.');
        }
        return response.json();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  fetchDataFromAPI()
    .then((apiData) => {
      data = apiData; // Almacenar los datos en la variable
      const categories = [...new Set(apiData.events.map((event) => event.category))];

      categories.forEach((category) => {
        const label = document.createElement("label");
        label.innerHTML = `
          <input type="checkbox" name="category" value="${category}">
          <span>${category}</span>
        `;
        categoryFilter.appendChild(label);
      });

      function filterEvents() {
        const searchText = document.querySelector(".input").value.toLowerCase();
        const selectedCategories = Array.from(
          document.querySelectorAll('input[name="category"]:checked')
        ).map((checkbox) => checkbox.value.toLowerCase());

        const filteredEvents = data.events.filter((event) => {
          const eventCategory = event.category.toLowerCase();
          const eventName = event.name.toLowerCase();

          const categoryMatch =
            selectedCategories.length === 0 || selectedCategories.includes(eventCategory);

          const textMatch = eventName.includes(searchText) || eventCategory.includes(searchText);

          return categoryMatch && textMatch;
        });

        contenedorEventos.innerHTML = "";

        if (filteredEvents.length === 0) {
          const noResultsMessage = document.createElement("p");
          noResultsMessage.textContent = "Category not found.";
          contenedorEventos.appendChild(noResultsMessage);
        } else {
          for (const event of filteredEvents) {
            const card = document.createElement("div");
            card.classList.add("event-card");

            card.innerHTML = `
              <div class="col-12 col-sm-6 col-md-4 col-xl-3">
                <div class="card card-events">
                  <img src="${event.image}" class="card-img-top" alt="${event.name}">
                  <div class="card-body d-flex flex-column justify-content-center">
                    <h5 class="card-title">${event.name}</h5>
                    <p class="card-text">${event.description}</p>
                    <p>$${event.price}</p>
                    <a href="./details.html?eventId=${event._id}" class="btn btn-dark details-button">Details</a>
                  </div>
                </div>
              </div>
            `;

            contenedorEventos.appendChild(card);
          }
        }
      }

      document.querySelector(".input").addEventListener("input", filterEvents);
      document
        .querySelectorAll('input[name="category"]')
        .forEach((checkbox) => checkbox.addEventListener("change", filterEvents));

      // Llamada inicial para mostrar todos los eventos al cargar la página
      filterEvents();
    })
    .catch((error) => {
      console.error(error);
    });
});
