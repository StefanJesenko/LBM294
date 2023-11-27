const mainContent = document.getElementById('main-content');

// Laden der JSON-Daten
const apiEndpoint = 'http://localhost:2940/api/v1/entities';

const loadRestaurantData = async () => {
    try {
        const response = await fetch(apiEndpoint);
        if (!response.ok) {
            throw new Error('Fehler beim Laden der Daten');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fehler beim Laden der Daten: ', error);
        return [];
    }
};

// Anzeigen der Restaurants
// Anzeigen der Restaurants
const displayRestaurants = async () => {
    mainContent.innerHTML = '';
    const restaurants = await loadRestaurantData();
    console.log('Geladene Restaurants:', restaurants);
    const restaurantList = document.createElement('ul');
    
    restaurants.forEach((restaurant, index) => {
        const listItem = document.createElement('li');
        const title = document.createElement('h2');
        const address = document.createElement('p');
        const deleteButton = document.createElement('button');

        title.textContent = restaurant.name;
        address.textContent = `Adresse: ${restaurant.address}`;
        deleteButton.textContent = 'Löschen';
        deleteButton.className = 'delete-btn';
        deleteButton.onclick = () => deleteRestaurant(index);

        listItem.appendChild(title);
        listItem.appendChild(address);
        listItem.appendChild(deleteButton);
        restaurantList.appendChild(listItem);
    });

    mainContent.appendChild(restaurantList);
};

// Funktion zum Löschen eines Restaurants
const deleteRestaurant = async (index) => {
    // Fetch the current restaurant list
    const restaurants = await loadRestaurantData();
    // Use the index to find the correct restaurant
    const restaurantToDelete = restaurants[index];
    if (!restaurantToDelete) {
        console.error('Restaurant not found!');
        return;
    }
    // Assuming each restaurant has a unique identifier in the `id` property
    try {
        await fetch(`${apiEndpoint}/${restaurantToDelete.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        console.log('Restaurant wurde gelöscht:', restaurantToDelete);
        // Refresh the restaurant list after deletion
        displayRestaurants();
    } catch (error) {
        console.error('Fehler beim Löschen des Restaurants: ', error);
    }
};


// Event Listener für die Navigation
document.addEventListener('DOMContentLoaded', () => {
    displayRestaurants();

    // Event Listener für den Link "Startseite"
    const homeLink = document.querySelector('a[href="#home"]');
    homeLink.addEventListener('click', (e) => {
        e.preventDefault();
        displayRestaurants(); // Zeigen Sie alle Restaurants an, wenn "Startseite" geklickt wird
    });

    // Event Listener für den Link "Restaurant hinzufügen"
    const addRestaurantLink = document.querySelector('a[href="#add-menu"]');
    addRestaurantLink.addEventListener('click', (e) => {
        e.preventDefault();
        showAddRestaurantForm();
    });
});

// Funktion zum Hinzufügen eines neuen Restaurants
const addRestaurant = async (name, address) => {
    console.log('addRestaurant-Funktion aufgerufen');
    try {
        await fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, address })
        });
        console.log('Das Restaurant wurde hinzugefügt.');
    } catch (error) {
        console.error('Fehler beim Hinzufügen des Restaurants: ', error);
    }
};

// Funktion zum Aktualisieren der JSON-Datei
const updateJsonFile = async (data) => {
    console.log('updateJsonFile-Funktion aufgerufen');
    try {
        await fetch(apiEndpoint, {
            method: 'POST', // or 'PUT' if your server-side endpoint requires it
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        console.log('Die Daten wurden erfolgreich aktualisiert.');
    } catch (error) {
        console.error('Fehler beim Aktualisieren der JSON-Datei: ', error);
    }
};

// Funktion zum Anzeigen des Formulars zum Hinzufügen von Restaurants
const showAddRestaurantForm = () => {
    mainContent.innerHTML = '';

    const addRestaurantForm = document.createElement('form');
    addRestaurantForm.id = 'add-restaurant-form';
    addRestaurantForm.innerHTML = `
        <h2>Restaurant hinzufügen</h2>
        <label for="restaurant-name">Name:</label>
        <input type="text" id="restaurant-name" required><br>
        <label for="restaurant-address">Adresse:</label>
        <input type="text" id="restaurant-address" required><br>
        <button type="submit">Hinzufügen</button>
    `;

    mainContent.appendChild(addRestaurantForm);

    // Event Listener für das Hinzufügen eines neuen Restaurants
    addRestaurantForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const restaurantName = document.getElementById('restaurant-name').value;
        const restaurantAddress = document.getElementById('restaurant-address').value;

        if (restaurantName && restaurantAddress) {
            // Fügen Sie das neue Restaurant den Daten hinzu
            await addRestaurant(restaurantName, restaurantAddress);
            displayRestaurants(); // Zeigen Sie die aktualisierte Liste der Restaurants an
        } else {
            alert('Bitte geben Sie einen gültigen Namen und Adresse ein.');
        }
    });
};
