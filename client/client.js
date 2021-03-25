//Variables to hold html elements for use with javascript
const order_form = document.querySelector('.order-form');
const order_table = document.querySelector('.table');
const testButton = document.querySelector('.test-button')



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
		zoom: 12
	});

	console.log(globalMap);

	globalMap.attributionControl._map

	globalMap.addControl(L.mapquest.control());
	//map.addLayer(L.mapquest.trafficLayer());
	//map.addLayer(L.mapquest.incidentsLayer());

}

function tabelSetUp() {
	var row = order_table.insertRow(0);

	var orderNumber = row.insertCell(0);
	orderNumber.innerHTML = "Order #";

	var orderName = row.insertCell(1);
	orderName.innerHTML = "Name";

	var orderStreet = row.insertCell(2);
	orderStreet.innerHTML = "Street";

	var orderCity = row.insertCell(3);
	orderCity.innerHTML = "City";

	var orderState = row.insertCell(4);
	orderState.innerHTML = "State";

	var orderZipcode = row.insertCell(5);
	orderZipcode.innerHTML = "Zipcode";

}

function appendOrder(number, name, street, city, state, zipcode) {
	var row = order_table.insertRow(number);
	row.id = number.toString();

	var order = row.insertCell(0);
	order.className = "row-data";
	order.innerHTML = number;

	var orderName = row.insertCell(1);
	orderName.className = "row-data";
	orderName.innerHTML = name;

	var orderStreet = row.insertCell(2);
	orderStreet.className = "row-data";
	orderStreet.innerHTML = street;

	var orderCity = row.insertCell(3);
	orderCity.className = "row-data";
	orderCity.innerHTML = city;

	var orderState = row.insertCell(4);
	orderState.className = "row-data";
	orderState.innerHTML = state;

	var orderZipcode = row.insertCell(5);
	orderZipcode.className = "row-data";
	orderZipcode.innerHTML = zipcode;

	row.addEventListener('click', async (event) => {
		event.preventDefault();
		console.log("WOrked");

		console.log(event.target.parentNode.id);

		var rowId = event.target.parentNode.id;

		var data = document.getElementById(rowId).querySelectorAll('.row-data');

		var street = data[2].innerText;
		var city = data[3].innerText;
		var state = data[4].innerText;
		var zipcode = data[5].innerText;

		var coordinates = await getCoordinates(street, city, state, zipcode);

		let lat = coordinates.results[0].locations[0].latLng.lat;
		let lng = coordinates.results[0].locations[0].latLng.lng;

		createMarker(lat, lng);

		panMap(lat, lng);
	})
}

function listAllOrders() {

	let count = 0;

	order_table.innerHTML = "";

	tabelSetUp();


	fetch(API_URL + "orders")
		.then(res => res.json())
		.then(orders => {
			console.log(orders);

			console.log(count);

			orders.forEach(order => {

				count = count + 1;

				appendOrder(count, order.name, order.address, order.city, order.state, order.zipcode)

			})
		})

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
	tabelSetUp();


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

testButton.addEventListener('click', (event) => {
	event.preventDefault();
	listAllOrders();
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

			const order = {
				name: name,
				address: address,
				city: city,
				state: state,
				zipcode: zipcode
			}

			fetch(API_URL + "getOrder", {
				method: 'POST',
				body: JSON.stringify(order),
				headers: {
					'content-type': 'application/json'
				}
			}).then(res => res.json())
				.then(createdOrder => {
					console.log(createdOrder);
				})

			listAllOrders();

			alert("Order Saved")
		}

	} catch (error) {

		console.log(error);
	}

});
