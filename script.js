// Fetch data for destinations
function fetchDestinations() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            // Populate homepage with destination cards
            const container = document.getElementById('destination-container');
            data.forEach(dest => {
                const card = document.createElement('div');
                card.classList.add('destination-card');
                card.innerHTML = `
                    <img class="destination-image" src="${dest.image}" alt="${dest.name}">
                    <h3>${dest.name}</h3>
                    <p>${dest.description}</p>

                    <a href="destination.html?id=${dest.id}">View Details</a>
                `;
                container.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching destinations:', error));
}

// Load destination details when on the destination page
function loadDestinationDetails() {
    const params = new URLSearchParams(window.location.search);
    const destinationId = parseInt(params.get('id'), 10);

    fetch('data.json')
        .then(response => response.json())
        .then(destinations => {
            const destination = destinations.find(dest => dest.id === destinationId);
            if (destination) {
                // Populate destination details page
                document.getElementById('destination-image').src = destination.image;
                document.getElementById('destination-name').textContent = destination.name;
                document.getElementById('destination-description').textContent = destination.long_description;

                // Add itinerary
                const itineraryList = document.getElementById('itinerary-list');
                itineraryList.innerHTML = ''; // Clear any existing list items
                destination.details.itinerary.forEach(item => {
                    const listItem = document.createElement('li');
                    listItem.textContent = item;
                    itineraryList.appendChild(listItem);
                });

                const locationCoordinates = document.getElementById('location-coordinates');
                locationCoordinates.textContent = `Latitude: ${destination.location.latitude}, Longitude: ${destination.location.longitude}`;

                // Map container (displaying coordinates)
                const mapContainer = document.getElementById('map-container');
                mapContainer.textContent = `Latitude: ${destination.location.latitude} | Longitude: ${destination.location.longitude}`;

            }
        })
        .catch(error => console.error('Error loading destination details:', error));
}

// Handle booking form submission
function handleBookingForm() {
    const form = document.getElementById('form');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const travelers = document.getElementById('travelers').value;
        const date = document.getElementById('date').value;

        // Validation
        const currentDate = new Date();
        const travelDate = new Date(date);
        if (travelDate <= currentDate) {
            alert('Travel date must be today or in the future.');
            return;
        }

        if (travelers < 1) {
            alert('Number of travelers must be at least 1.');
            return;
        }

        // Log booking details
        console.log('Booking Submitted:', { name, email, travelers, date });
        alert('Tour Booked!');

        // Clear form
        form.reset();
    });
}

// Initialize on respective pages
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('destination-container')) {
        fetchDestinations();
    } else if (document.getElementById('destination-info')) {
        loadDestinationDetails();
        handleBookingForm();
    }
});
