const mainContent = document.getElementById('main-content');
const loggedOutNavItemsDiv = document.getElementById('logged-out-nav-items');
let userIsLoggedIn = false;
const Visibility = () => {
    const isLoggedIn = localStorage.getItem('accessToken') !==null;
    // Wählen Sie die Navigations-Elemente aus und ändern Sie ihren Stil basierend auf dem Anmeldestatus
    const navItems = document.querySelectorAll('#nav-home, #nav-menu, #nav-add-menu');
    if( isLoggedIn !== null)
    navItems.forEach(item => {
        item.style.display = isLoggedIn ? 'inline-block' : 'none';
    });
};
const apiEndpoint = 'http://localhost:2940/api/v1/entities';
const apiEndpointDisplay = 'http://localhost:2940/api/v1/entities';
const checkLoginStatus = () => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        console.log("Redirecting to login page...");
        
        return false;
    }
    return true;
};

const loadRestaurantData = async () => {
    try {
        const response = await fetchWithAuth(apiEndpoint);
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
const loadRestaurantDataDisplay = async () => {
    try {
        const response = await fetchWithAuth(apiEndpointDisplay);
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

const displayHomescreen = async () => {
    const addHomeForm = document.createElement('form');
    addHomeForm.id = 'add-home-form';
    addHomeForm.innerHTML = `
    <h2>Wilkommen zu meiner Webseite</h2><br>
    <p>Auf dieser Webseite können Sie Restaurants und Menüs zu einer Liste hinzufügen und später abrufen.<p>`
    mainContent.appendChild(addHomeForm);
}
const displayRestaurants = async () => {
    mainContent.innerHTML = '';
    if (!checkLoginStatus()) {
        return; // Stop the function if the user is not logged in
    }
    const restaurants = await loadRestaurantDataDisplay();
    console.log('Geladene Restaurants:', restaurants);
    const restaurantList = document.createElement('ul');
    
    restaurants.forEach((restaurant, index) => {
        const listItem = document.createElement('li');
        const title = document.createElement('h2');
        const address = document.createElement('p');
        const monday = document.createElement('h3');
        const mondayMenuName = document.createElement('p');
        const mondayMenuPrice = document.createElement('p');
        const mondayVegan = document.createElement('input');
        const tuesday = document.createElement('h3');
        const tuesdayMenuName = document.createElement('p');
        const tuesdayMenuPrice = document.createElement('p');
        const tuesdayVegan = document.createElement('input');
        const wednesday = document.createElement('h3');
        const wednesdayMenuName = document.createElement('p');
        const wednesdayMenuPrice = document.createElement('p');
        const wednesdayVegan = document.createElement('input');
        const thursday = document.createElement('h3');
        const thursdayMenuName = document.createElement('p');
        const thursdayMenuPrice = document.createElement('p');
        const thursdayVegan = document.createElement('input');
        const friday = document.createElement('h3');
        const fridayMenuName = document.createElement('p');
        const fridayMenuPrice = document.createElement('p');
        const fridayVegan = document.createElement('input');
        const saturday = document.createElement('h3');
        const saturdayMenuName = document.createElement('p');
        const saturdayMenuPrice = document.createElement('p');
        const saturdayVegan = document.createElement('input');
        const sonnday = document.createElement('h3');
        const sonndayMenuName = document.createElement('p');
        const sonndayMenuPrice = document.createElement('p');
        const sonndayVegan = document.createElement('input');
        const deleteButton = document.createElement('button');

        title.textContent = restaurant.name;
        address.textContent = `Adresse: ${restaurant.address}`;
        monday.textContent = 'Montag';
        mondayMenuName.textContent = `Name : ${restaurant.mondayMenuName}`;
        mondayMenuPrice.textContent = `Preis : ${restaurant.mondayPrice}`;
        mondayVegan.type = 'checkbox';
        mondayVegan.id = 'monday-menu-vegan';
        mondayVegan.checked = restaurant.mondayVegan;
        tuesday.textContent = 'Dienstag';
        tuesdayMenuName.textContent = `Name : ${restaurant.tuesdayMenuName}`;
        tuesdayMenuPrice.textContent = `Preis : ${restaurant.tuesdayPrice}`;
        tuesdayVegan.type = 'checkbox';
        tuesdayVegan.id = 'tuesday-menu-vegan';
        tuesdayVegan.checked = restaurant.tuesdayVegan;
        wednesday.textContent = 'Mittwoch';
        wednesdayMenuName.textContent = `Name : ${restaurant.wednesdayMenuName}`;
        wednesdayMenuPrice.textContent = `Preis : ${restaurant.wednesdayPrice}`;
        wednesdayVegan.type = 'checkbox';
        wednesdayVegan.id = 'wednesday-menu-vegan';
        wednesdayVegan.checked = restaurant.wednesdayVegan;
        thursday.textContent = 'Donnerstag';
        thursdayMenuName.textContent = `Name : ${restaurant.thursdayMenuName}`;
        thursdayMenuPrice.textContent = `Preis : ${restaurant.thursdayPrice}`;
        thursdayVegan.type = 'checkbox';
        thursdayVegan.id = 'thursday-menu-vegan';
        thursdayVegan.checked = restaurant.thursdayVegan;
        friday.textContent = 'Freitag';
        fridayMenuName.textContent = `Name : ${restaurant.fridayMenuName}`;
        fridayMenuPrice.textContent = `Preis : ${restaurant.fridayPrice}`;
        fridayVegan.type = 'checkbox';
        fridayVegan.id = 'friday-menu-vegan';
        fridayVegan.checked = restaurant.fridayVegan;
        saturday.textContent = 'Samstag';
        saturdayMenuName.textContent = `Name : ${restaurant.saturdayMenuName}`;
        saturdayMenuPrice.textContent = `Preis : ${restaurant.saturdayPrice}`;
        saturdayVegan.type = 'checkbox';
        saturdayVegan.id = 'saturday-menu-vegan';
        saturdayVegan.checked = restaurant.saturdayVegan;
        sonnday.textContent = 'Sonntag';
        sonndayMenuName.textContent = `Name : ${restaurant.sonndayMenuName}`;
        sonndayMenuPrice.textContent = `Preis : ${restaurant.sonndayPrice}`;
        sonndayVegan.type = 'checkbox';
        sonndayVegan.id = 'sonnday-menu-vegan';
        sonndayVegan.checked = restaurant.sonndayVegan;
        deleteButton.textContent = 'Löschen';
        deleteButton.className = 'delete-btn';
        deleteButton.onclick = () => deleteRestaurant(index);

        listItem.appendChild(title);
        listItem.appendChild(address);
        listItem.appendChild(monday);
        listItem.appendChild(mondayMenuName);
        listItem.appendChild(mondayMenuPrice);
        listItem.appendChild(mondayVegan);
        listItem.appendChild(tuesday);
        listItem.appendChild(tuesdayMenuName);
        listItem.appendChild(tuesdayMenuPrice);
        listItem.appendChild(tuesdayVegan);
        listItem.appendChild(wednesday);
        listItem.appendChild(wednesdayMenuName);
        listItem.appendChild(wednesdayMenuPrice);
        listItem.appendChild(wednesdayVegan);
        listItem.appendChild(thursday);
        listItem.appendChild(thursdayMenuName);
        listItem.appendChild(thursdayMenuPrice);
        listItem.appendChild(thursdayVegan);
        listItem.appendChild(friday);
        listItem.appendChild(fridayMenuName);
        listItem.appendChild(fridayMenuPrice);
        listItem.appendChild(fridayVegan);
        listItem.appendChild(saturday);
        listItem.appendChild(saturdayMenuName);
        listItem.appendChild(saturdayMenuPrice);
        listItem.appendChild(saturdayVegan);
        listItem.appendChild(sonnday);
        listItem.appendChild(sonndayMenuName);
        listItem.appendChild(sonndayMenuPrice);
        listItem.appendChild(sonndayVegan);
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
        await fetchWithAuth(`${apiEndpoint}/${restaurantToDelete.id}`, {
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
    
    if (!checkLoginStatus()) {
        return; // Stop further execution if not logged in
    }
    
        // Wenn der Benutzer bereits angemeldet ist, anzeigen Sie die Restaurants
        displayRestaurants();
   
        // Wenn der Benutzer nicht angemeldet ist, zeigen Sie das Anmeldeformular an
        document.getElementById('nav-home').style.display = 'none';
        document.getElementById('nav-menu').style.display = 'none';
        document.getElementById('nav-add-menu').style.display = 'none'; // Verstecke das Anmeldeformular standardmäßig
    
    // Event Listener für den Link "Startseite"
    const homeLink = document.querySelector('a[href="#home"]');
    homeLink.addEventListener('click', (e) => {
        e.preventDefault();
        displayHomescreen(); // Zeigen Sie alle Restaurants an, wenn "Startseite" geklickt wird
    });
    const menuLink = document.querySelector('a[href="#menu"]');
    menuLink.addEventListener('click', (e) => {
        e.preventDefault();
        displayRestaurants(); // Zeigen Sie alle Restaurants an, wenn "Startseite" geklickt wird
    });



    // Event Listener für den Link "Restaurant hinzufügen"
    const addRestaurantLink = document.querySelector('a[href="#add-menu"]');
    addRestaurantLink.addEventListener('click', (e) => {
        e.preventDefault();
        showAddRestaurantForm(); // Zeige das Restaurant-Hinzufügen-Formular, wenn "Restaurant hinzufügen" geklickt wird
    });
});

// Funktion zum Hinzufügen eines neuen Restaurants
const addRestaurant = async (name, address,mondayMenuName,tuesdayMenuName,wednesdayMenuName,thursdayMenuName,fridayMenuName,saturdayMenuName,sonndayMenuName, mondayPrice, tuesdayPrice, wednesdayPrice, thursdayPrice, fridayPrice, saturdayPrice, sonndayPrice, mondayVegan, tuesdayVegan, wednesdayVegan, thursdayVegan, fridayVegan, saturdayVegan, sonndayVegan) => {
    console.log('addRestaurant-Funktion aufgerufen');
    try {
        await fetchWithAuth(apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, address,mondayMenuName,tuesdayMenuName,wednesdayMenuName,thursdayMenuName, fridayMenuName, saturdayMenuName, sonndayMenuName,mondayPrice, tuesdayPrice, wednesdayPrice, thursdayPrice, fridayPrice, saturdayPrice, sonndayPrice, mondayVegan, tuesdayVegan, wednesdayVegan, thursdayVegan, fridayVegan, saturdayVegan, sonndayVegan})
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
        await fetchWithAuth(apiEndpoint, {
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
        <h3>Montag<h3>
        <label for="monday-menu-name">Menu Name:</label>
        <input type="text" id="monday-menu-name" required><br>
        <label for="monday-menu-price">Menu Preis:</label>
        <input type="number" id="monday-menu-price" required><br>
        <label for"monday-menu-vegan">Menü Vegan:</label>
        <input type="checkbox" id="monday-menu-vegan"><br>
        <h3>Dienstag<h3>
        <label for="tuesday-menu-name">Menu:</label>
        <input type="text" id="tuesday-menu-name" required><br>
        <label for="tuesday-menu-price">Menu Preis:</label>
        <input type="number" id="tuesday-menu-price" required><br>
        <label for"tuesday-menu-vegan">Menü Vegan:</label>
        <input type="checkbox" id="tuesday-menu-vegan"><br>
        <h3>Mittwoch<h3>
        <label for="wednesday-menu-name">Menu:</label>
        <input type="text" id="wednesday-menu-name" required><br>
        <label for="wednesday-menu-price">Menu Preis:</label>
        <input type="number" id="wednesday-menu-price" required><br>
        <label for"wednesday-menu-vegan">Menü Vegan:</label>
        <input type="checkbox" id="wednesday-menu-vegan"><br>
        <h3>Donnerstag<h3>
        <label for="thursday-menu-name">Menu:</label>
        <input type="text" id="thursday-menu-name" required><br>
        <label for="thursday-menu-price">Menu Preis:</label>
        <input type="number" id="thursday-menu-price" required><br>
        <label for"thursday-menu-vegan">Menü Vegan:</label>
        <input type="checkbox" id="thursday-menu-vegan"><br>
        <h3>Freitag<h3>
        <label for="friday-menu-name">Menu:</label>
        <input type="text" id="friday-menu-name" required><br>
        <label for="friday-menu-price">Menu Preis:</label>
        <input type="number" id="friday-menu-price" required><br>
        <label for"friday-menu-vegan">Menü Vegan:</label>
        <input type="checkbox" id="friday-menu-vegan"><br>
        <h3>Samstag<h3>
        <label for="saturday-menu-name">Menu:</label>
        <input type="text" id="saturday-menu-name" required><br>
        <label for="saturday-menu-price">Menu Preis:</label>
        <input type="number" id="saturday-menu-price" required><br>
        <label for"saturday-menu-vegan">Menü Vegan:</label>
        <input type="checkbox" id="saturday-menu-vegan"><br>
        <h3>Sonntag<h3>
        <label for="sonnday-menu-name">Menu:</label>
        <input type="text" id="sonnday-menu-name" required><br>
        <label for="sonnday-menu-price">Menu Preis:</label>
        <input type="number" id="sonnday-menu-price" required><br>
        <label for"sonnday-menu-vegan">Menü Vegan:</label>
        <input type="checkbox" id="sonnday-menu-vegan"><br>
        <button type="submit">Hinzufügen</button>
    `;

    mainContent.appendChild(addRestaurantForm);

    // Event Listener für das Hinzufügen eines neuen Restaurants
    addRestaurantForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const restaurantName = document.getElementById('restaurant-name').value;
        const restaurantAddress = document.getElementById('restaurant-address').value;
        const mondayMenuName = document.getElementById('monday-menu-name').value;
        const tuesdayMenuName = document.getElementById('tuesday-menu-name').value;
        const wednesdayMenuName = document.getElementById('wednesday-menu-name').value;
        const thursdayMenuName = document.getElementById('thursday-menu-name').value;
        const fridayMenuName = document.getElementById('friday-menu-name').value;
        const saturdayMenuName = document.getElementById('saturday-menu-name').value;
        const sonndayMenuName = document.getElementById('sonnday-menu-name').value;
        const mondayPrice = document.getElementById('monday-menu-price').value;
        const tuesdayPrice = document.getElementById('tuesday-menu-price').value;
        const wednesdayPrice = document.getElementById('wednesday-menu-price').value;
        const thursdayPrice = document.getElementById('thursday-menu-price').value;
        const fridayPrice = document.getElementById('friday-menu-price').value;
        const saturdayPrice = document.getElementById('saturday-menu-price').value;
        const sonndayPrice = document.getElementById('sonnday-menu-price').value;
        const mondayVegan = document.getElementById('monday-menu-vegan').checked;
        const tuesdayVegan = document.getElementById('tuesday-menu-vegan').checked;
        const wednesdayVegan = document.getElementById('wednesday-menu-vegan').checked;
        const thursdayVegan = document.getElementById('thursday-menu-vegan').checked;
        const fridayVegan = document.getElementById('friday-menu-vegan').checked;
        const saturdayVegan = document.getElementById('saturday-menu-vegan').checked;
        const sonndayVegan = document.getElementById('sonnday-menu-vegan').checked;

        
        if (restaurantName && 
            restaurantAddress && 
            mondayMenuName && 
            tuesdayMenuName && 
            wednesdayMenuName &&
            thursdayMenuName &&
            fridayMenuName &&
            saturdayMenuName && 
            sonndayMenuName&&
            mondayPrice&&
            tuesdayPrice&&
            wednesdayPrice&&
            thursdayPrice&&
            fridayPrice&&
            saturdayPrice&&
            sonndayPrice) {
            // Fügen Sie das neue Restaurant den Daten hinzu
            await addRestaurant(restaurantName, restaurantAddress,mondayMenuName,tuesdayMenuName,wednesdayMenuName,thursdayMenuName,fridayMenuName,saturdayMenuName,sonndayMenuName,mondayPrice,tuesdayPrice,wednesdayPrice,thursdayPrice,fridayPrice,saturdayPrice,sonndayPrice,mondayVegan,tuesdayVegan,wednesdayVegan,thursdayVegan,fridayVegan,saturdayVegan,sonndayVegan);
            displayRestaurants(); // Zeigen Sie die aktualisierte Liste der Restaurants an
        } else {
            alert('Bitte geben Sie einen gültigen Namen und Adresse ein.');
        }
    });
};
const login = async () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    try {
        const response = await fetchWithAuth('http://localhost:2941/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error('Login fehlgeschlagen');
        }
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        document.getElementById('login-form-container').style.display = 'none';
        const isLoggedIn = localStorage.getItem('accessToken') !== null;
    // Wählen Sie die Navigations-Elemente aus und ändern Sie ihren Stil basierend auf dem Anmeldestatus
    const navItems = document.querySelectorAll('#nav-home, #nav-menu, #nav-add-menu');
    if( isLoggedIn !== null)
    navItems.forEach(item => {
        item.style.display = isLoggedIn ? 'inline-block' : 'none';
    });
    userIsLoggedIn = true;
    displayRestaurants();
    } catch (error) {
        console.error('Fehler beim Login: ', error);
    }
};

document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    login();
});
const fetchWithAuth = async (url, options = {}) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        // Wenn kein AccessToken vorhanden ist, wird der Benutzer zur Anmeldeseite weitergeleitet
        window.location.href = 'login.html'; // Hier "login.html" durch Ihre tatsächliche Anmeldeseite ersetzen
    }
    if (!options.headers) {
        options.headers = {};
    }
    options.headers.Authorization = `Bearer ${accessToken}`;
    return fetch(url, options);
};
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        if (checkLoginStatus()) {
            // Only proceed if user is logged in
            const index = parseInt(e.target.getAttribute('data-index'));
            if (!isNaN(index)) {
                deleteRestaurant(index);
            }
        }
    }
});


