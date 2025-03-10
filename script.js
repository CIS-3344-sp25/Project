// Sample JSON data for destinations
const destinationsData = [
    {
        "id": 1,
        "name": "Seoul, South Korea",
        "image": "pics/korea.jpg",
        "description": "South Korea offers a mix of historical sites, beautiful landscapes like Jeju Island, and cutting-edge technology.",
        "details": {
            "long_description": "Seoul, the capital of South Korea, is a vibrant city where modern skyscrapers meet traditional palaces, Buddhist temples, and shopping districts.",
            "itinerary": [
                "Day 1: Explore Hanok Village.",
                "Day 2: Visit Seoul Tower.",
                "Day 3: Visit the War Memorial of Korea."
            ]
        },
        "location": {
            "latitude": 37.5665,
            "longitude": 126.9780
        }
    },
    {
        "id": 2,
        "name": "Tokyo, Japan",
        "image": "pics/tokyo.jpg",
        "description": "Tokyo is known for its beautiful cherry blossoms, serene shrines, and world-class cuisine like sushi and ramen.",
        "details": {
            "long_description": "Tokyo is home to ancient temples, stunning gardens, and traditional tea houses.",
            "itinerary": [
                "Day 1: Explore Meiji Shrine.",
                "Day 2: Meal at Gion District.",
                "Day 3: Visit Universal Studios Japan."
            ]
        },
        "location": {
            "latitude": 35.6762,
            "longitude": 139.6503
        }
    },
    {
        "id": 3,
        "name": "Punta Cana, Dominican Republic",
        "image": "pics/punta.jpg",
        "description": "Punta Cana is famous for its pristine beaches, crystal-clear waters, and all-inclusive resorts.",
        "details": {
            "long_description": "Punta Cana is known for stunning beaches, vibrant nightlife, and a variety of water activities.",
            "itinerary": [
                "Day 1: Spend the day at Bavaro Beach.",
                "Day 2: Take a catamaran cruise.",
                "Day 3: Explore Hoyo Azul lagoon."
            ]
        },
        "location": {
            "latitude": 18.5822,
            "longitude": -68.4055
        }
    }
];

// Function to display destinations on the homepage
function displayDestinations() {
    const destinationContainer = document.getElementById('destination-container');
    destinationsData.forEach(destination => {
        const card = document.createElement('div');
        card.classList.add('destination-card');
        card.innerHTML = `
            <img src="${destination.image}" alt="${destination.name}" class="destination-image">
            <h3>${destination.name}</h3>
            <p>${destination.description}</p>
            <a href="destination.html?id=${destination.id}">View More</a>
        `;
        destinationContainer.appendChild(card);
    });
}

// Call function to display destinations on the homepage
displayDestinations();
// Function to load destination details on the destination page
function loadDestinationDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const destinationId = parseInt(urlParams.get('id'), 10);
    const destination = destinationsData.find(d => d.id === destinationId);

    if (destination) {
        document.getElementById('destination-image').src = destination.image;
        document.getElementById('destination-name').textContent = destination.name;
        document.getElementById('destination-description').textContent = destination.details.long_description;

        const itineraryList = document.getElementById('itinerary-list');
        destination.details.itinerary.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = item;
            itineraryList.appendChild(listItem);
        });
    }
}

// Call function to load destination details if on destination.html
if (window.location.pathname.includes('destination.html')) {
    window.onload = loadDestinationDetails;
}
