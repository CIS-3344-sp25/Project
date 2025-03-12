// Fetch data for destinations
function fetchDestinations() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            // Store all destinations in localStorage (optional)
            localStorage.setItem('allDestinations', JSON.stringify(data));

            // Initially populate homepage with all destinations
            displayDestinations(data);
        })
        .catch(error => console.error('Error fetching destinations:', error));
}

// Function to display destinations
function displayDestinations(destinations) {
    const container = document.getElementById('destination-container');
    container.innerHTML = ''; // Clear previous results
    destinations.forEach(dest => {
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
}

// Function to handle search functionality
function searchDestinations(event) {
    const query = event.target.value.toLowerCase(); // Get the search query
    const allDestinations = JSON.parse(localStorage.getItem('allDestinations')); // Get all destinations from localStorage

    if (allDestinations) {
        // Filter destinations based on the search query
        const filteredDestinations = allDestinations.filter(dest => {
            return (
                dest.name.toLowerCase().includes(query) ||
                dest.description.toLowerCase().includes(query)
            );
        });

        // Display filtered destinations
        displayDestinations(filteredDestinations);
    }
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

                // Initialize Leaflet map
                const mapContainer = document.getElementById('map-container');
                const latitude = destination.location.latitude;
                const longitude = destination.location.longitude;

                // Create a map and set its initial view (centered on the destination)
                const map = L.map(mapContainer).setView([latitude, longitude], 13);

                // Add OpenStreetMap tiles
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(map);

                // Add a marker at the destination's location
                L.marker([latitude, longitude]).addTo(map)
                    .bindPopup(`
                        <b>${destination.name}</b>
                        <br><img src="${destination.image}" alt="${destination.name}" style="width: 100%; max-height: 200px;">
                        <p>${destination.description}</p>
                    `);

                // Optionally, adjust the map view to fit the marker
                map.setView([latitude, longitude], 13);
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
        // This means the current page is the homepage or search page
        fetchDestinations();

        // Set up the search input listener
        document.getElementById('search-input').addEventListener('input', searchDestinations);
    } else if (document.getElementById('destination-info')) {
        // This means the current page is destination.html
        loadDestinationDetails();
        handleBookingForm();
    }
});
