document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get("eventId");
    
    if (eventId) {
        const selectedEvent = data.events.find((event) => event._id === eventId);
        
        if (selectedEvent) {
            const eventDetailsContainer = document.getElementById("contenedorEventos");
            
            if (eventDetailsContainer) {
                const eventCard = document.createElement("div");
                eventCard.classList.add("col-md-6");

                eventCard.innerHTML = `
                    <div class="card mb-4">
                        <img src="${selectedEvent.image}" class="card-img-top" alt="${selectedEvent.name}">
                        <div class="card-body">
                            <h5 class="card-title">${selectedEvent.name}</h5>
                            <p class="card-text">${selectedEvent.description}</p>
                            <p class="card-text">${selectedEvent.category}</p>
                            <p class="card-text">${selectedEvent.date}</p>
                            <p class="card-text">${selectedEvent.place}</p>
                            <p class="card-text">$${selectedEvent.price}</p>
                        </div>
                    </div>
                `;
                
                eventDetailsContainer.appendChild(eventCard);
            }
        }
    }

    const backButton = document.getElementById("back-to-home");
    backButton.addEventListener("click", function () {
        window.location.href = "./home.html";
    });
});
