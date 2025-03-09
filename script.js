const { response } = require("express");

function displayDestinations() {
    const destinationContainer = document.getElementById('destination-cards');

    fetch('data.json')
        .then(response => response.json())
        .then(destinations => {
            const card = document.createElement('div');
            card.classList.add('destination-card');
            card.innerHTML = `
            <img src= "${destination.image}"`
        })
}