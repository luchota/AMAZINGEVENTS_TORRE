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

function filterEvents() {
  const searchText = document.querySelector(".input").value.toLowerCase();
  const selectedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked')).map((checkbox) => checkbox.value.toLowerCase()); // Convertir a minúsculas
  
  const filteredEvents = data.events.filter((event) => {
    const eventCategory = event.category.toLowerCase(); 
    const eventName = event.name.toLowerCase(); 
  
      
    const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(eventCategory);
  
      
    const textMatch = eventName.includes(searchText) || eventCategory.includes(searchText);
  
    return categoryMatch && textMatch;
  });
  
    
  const contenedorEventos = document.getElementById("contenedorEventos");
  contenedorEventos.innerHTML = "";
  
  if (filteredEvents.length === 0) {
    const noResultsMessage = document.createElement("p");
    noResultsMessage.textContent = "No se encontraron resultados.";
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
  contenedorEventos.appendChild(card);
      }
    }
  }

  document.querySelector(".input").addEventListener("input", filterEvents);
  document
    .querySelectorAll('input[name="category"]')
    .forEach((checkbox) => checkbox.addEventListener("change", filterEvents));


for (const event of data.events) {
  const eventDate = new Date(event.date);
  const currentDate = new Date(data.currentDate);

  
  if (eventDate >= currentDate) {
    
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

  
  contenedorEventos.appendChild(card);
}
}