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

//Function to create a route with the user entered start and end
function createRoute(start, end) {

	try {
		direction = L.mapquest.directions();

		direction.route({

			start: start,
			end: end,
			options: {
				timeOverage: 25,
				maxRoutes: 3,
			}

		});

		var directionsLayer = L.mapquest.directionsLayer({
			directionsResponse: response
		}).addTo(globalMap);
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

order_table.addEventListener('click', (event) => {
	console.log(event.target.innerText);


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
