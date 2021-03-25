//Dependencies
const express = require('express');
const cors = require('cors');
const monk = require('monk');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');

//app/database connections
const app = express();
const db = monk('localhost/TrafficDB');
const orders = db.get('orders');


//file connections
const middlewares = require('./middlewares');

//Functionality of dependencies
app.use(morgan('common'));
app.use(cors());
app.use(express.json())

//Simple get request for the '/' route
app.get('/', (req, res) => {
	res.json({
		message: "TRAFFIC IS COOL 🚦"
	});
});

app.get('/orders', (req, res) => {
	orders
		.find()
		.then(orders => {
			res.json(orders);
		});
});

app.post('/getOrder', (req, res) => {
	const order = {
		name: req.body.name,
		address: req.body.address,
		city: req.body.city,
		state: req.body.state,
		zipcode: req.body.zipcode
	}

	orders
		.insert(order)
		.then(createdOrder => {
			res.json(createdOrder);
		})

})

//A basic limiter so users can't spam the server with requests
const limiter = rateLimit({
	windowMs: 30 * 1000,
	max: 1
});
app.use(limiter);

//basic middleware functions to handle errors on route requests
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

//Set up server to listen on local host post 5000
app.listen(5000, () => {
	console.log("Listening on localhost:5000");
});