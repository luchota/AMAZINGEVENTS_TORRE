
const contenedorEventos = document.getElementById("contenedorEventos");

// Filtra los eventos por fecha y crea las cards
for (const event of data.events) {
  const eventDate = new Date(event.date);
  const currentDate = new Date(data.currentDate);

  // Compara las fechas
  if (eventDate >= currentDate) {
    // Crea un elemento div para la card del evento
    const card = document.createElement("div");
    card.classList.add("event-card");


    card.innerHTML = `
        <div class="col-12 col-sm-6 col-md-4 col-xl-3">
        <div class="card card-events">
            <img src="${event.image}" class="card-img-top" alt="${event.name}">
            <div class="card-body d-flex flex-column justify-content-center">
                <h5 class="card-title">${event.name}</h5>
                <h5 class="card-title">${event.date}</h5>
                <p class="card-text">${event.description}</p>
                <p class="card-text">${event.category}</p>
                <p class="card-text">${event.place}</p>
                <p>$${event.price}</p>
                <a href="./details.html" id=${event.id} class="btn btn-dark">Details</a>
            </div>
        </div>
  </div>
  `;

  // Agrega la card al contenedor de cards
  contenedorEventos.appendChild(card);
}
}