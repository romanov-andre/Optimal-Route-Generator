//Variables to hold html elements for use with javascript
const order_form = document.querySelector('.order-form');
const order_table = document.querySelector('.table');


//URL for fetch requests intended for the database
const API_URL = 'http://localhost:5000/';

//global map variable
var globalMap;
var direction;

//Function to create an initial map and center it on Estero
function initMap() {

	//May need to swap with a personal key from mapquest.com
	L.mapquest.key = 'cqknkkaMme9j37I5pUmC1ypE9pLVfozR';

	globalMap = L.mapquest.map('map', {
		center: [26.471196, -81.810648],
		layers: L.mapquest.tileLayer('map'),
		zoom: 14
	});

	console.log(globalMap);

	globalMap.attributionControl._map

	globalMap.addControl(L.mapquest.control());
	//map.addLayer(L.mapquest.trafficLayer());
	//map.addLayer(L.mapquest.incidentsLayer());

}

async function getCoordinates(street, city, state, zip) {


	const response = await fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=cqknkkaMme9j37I5pUmC1ypE9pLVfozR&street=${street}&city=${city}&state=${state}&postalcode=${zip}`);

	return response.json();

}

//Function to create a route with the user entered start and end
function createMarker(lat, lng) {

	try {
		L.marker([lat, lng], {
			icon: L.mapquest.icons.marker({
				primaryColor: '#22407F',
				secondaryColor: '#3B5998',
				shadow: true,
				size: 'md',
				symbol: 'A'
			})
		}).addTo(globalMap)
	} catch (error) {
		console.log(error);
	}
}

//Function that executes everytime the window loads for any reasons
window.onload = function () {
	initMap();

}

//Function to move the map when a new location is selected in the search bar
function panMap(lat, lon) {
	globalMap.panTo({
		lat: lat,
		lon: lon
	})
}

//Creates the search bar
var placeSearch = placeSearch({
	key: 'cqknkkaMme9j37I5pUmC1ypE9pLVfozR',
	container: document.querySelector('#place-search-input')
});

//Detects interaction with the search bar and returns 
placeSearch.on('change', (e) => {

	console.log(e);
	const lat = e.result.latlng.lat;
	const lon = e.result.latlng.lng;

	panMap(lat, lon);


});

order_table.addEventListener('click', async (event) => {

	console.log(event.target);

	const data = await getCoordinates("11161 Everblades Parkway", "Estero", "FL", "33928");

	let lat = data.results[0].locations[0].latLng.lat;
	let lng = data.results[0].locations[0].latLng.lng;

	createMarker(lat, lng);

	panMap(lat, lng);



})

//Listener for the route generator to get the start and end point of the desired route
order_form.addEventListener('submit', (event) => {

	try {
		//getting the form elements
		event.preventDefault();
		const loginData = new FormData(order_form);
		const name = loginData.get('name');
		const address = loginData.get('address');
		const zipcode = loginData.get('zipcode');
		const city = loginData.get('city');
		const state = loginData.get('state');


		if (name.toString().trim() === "" || address.toString().trim() === "" || zipcode.toString().trim() === "" || city.toString().trim() === "" || state.toString().trim() === "") {
			alert("Enter valid address: (123 main street, Estero, Florida)")
		} else {
			//TODO: Add the order to the db then to the list view
			alert("Order Saved")
		}

	} catch (error) {

		console.log(error);
	}

});
