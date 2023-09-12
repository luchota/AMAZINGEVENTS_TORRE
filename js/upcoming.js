document.addEventListener("DOMContentLoaded", function () {
  // Obtener datos asincrónicamente
  fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then((response) => response.json())
    .then((data) => {
      const upcomingEvents = data.events.filter((event) => {
        const eventDate = new Date(event.date);
        const currentDate = new Date(data.currentDate);
        return eventDate > currentDate;
      });

      const contenedorEventos = document.getElementById("contenedorEventos");
      const categories = [...new Set(data.events.map((event) => event.category))];

      const categoryFilter = document.getElementById("category-filter");
      categories.forEach((category) => {
        const label = document.createElement("label");
        label.innerHTML = `
          <input type="checkbox" name="category" value="${category}">
          <span>${category}</span>
        `;
        categoryFilter.appendChild(label);
      });

      function filterUpcomingEvents() {
        const searchText = document.querySelector(".input").value.toLowerCase();
        const selectedCategories = Array.from(
          document.querySelectorAll('input[name="category"]:checked')
        ).map((checkbox) => checkbox.value.toLowerCase());

        const filteredEvents = upcomingEvents.filter((event) => {
          const eventCategory = event.category.toLowerCase();
          const eventName = event.name.toLowerCase();

          const categoryMatch =
            selectedCategories.length === 0 || selectedCategories.includes(eventCategory);

          const textMatch = eventName.includes(searchText) || eventCategory.includes(searchText);

          return categoryMatch && textMatch;
        });

        const contenedorEventos = document.getElementById("contenedorEventos");
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

      document.querySelector(".input").addEventListener("input", filterUpcomingEvents);
      document
        .querySelectorAll('input[name="category"]')
        .forEach((checkbox) => checkbox.addEventListener("change", filterUpcomingEvents));

      // Llenar la página con eventos iniciales
      for (const event of upcomingEvents) {
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
    })
    .catch((error) => console.error("Error fetching data:", error));
});
