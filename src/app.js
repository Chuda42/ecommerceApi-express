/* imports */
const express = require('express');
const handlebars = require('express-handlebars');
const { dirname } = require('path');
const websocketServer = require('socket.io');

/* app */
const SERVER_PORT = 8081;
const app = express();

/* handlebars config */
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', dirname(__filename) + '/views');


/* middlewares */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* routes */
app.use('/api/products', require('./routes/product.router'));
app.use('/api/carts', require('./routes/cart.router'));
app.use('/', require('./routes/view.router'));

/* server */
const server = app.listen(SERVER_PORT, () => {
    console.log(`Server on port ${SERVER_PORT}`);
});
server.on('error', (err) =>{
    console.log(`Server error: ${err}`);
})
