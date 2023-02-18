/* imports */
const express = require('express');
const { Server } = require('socket.io');
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');
const path =  require('path');
const prodMan = require('./manager/ProductManager');
/* .env config */
require('dotenv').config();

/* const */
const PRODUCT_PATH = './products.json';

/* app */
const SERVER_PORT = process.env.SERVER_PORT || 8080;
const app = express();

/* handlebars settings */
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

/* settings */
app.use(express.static('public'));

/* middlewares */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* Db conection */
/* mongoose.connect('', (error) => {
    if (error) {
        console.log(`[DB] Error: ${error.message}`);
        process.exit()
    } else {
        console.log(`[DB] Connected`);
    }
}) */

/* routes */
app.use('/', require('./routes/view.router'));
app.use('/api/products', require('./routes/product.router'));
app.use('/api/carts', require('./routes/cart.router'));


/* http server */
const httpServer = app.listen(SERVER_PORT, () => {
    console.log(`[SERVER] Server listen on port ${SERVER_PORT}`);
});
httpServer.on('error', (err) =>{
    console.log(`[SERVER] Server error: ${err}`);
})

/* websocket server */
const io = new Server(httpServer);

/* set io server */
app.set('io', io);

/* websockets */
io.on('connection', async (socket) => {
    console.log(`[SOCKET] New client connected -> ${socket.id}`);

    let products = await new prodMan(PRODUCT_PATH).getProducts(); //[{title: 'product1', price:8}, {title: 'product2', price:81}]

    socket.emit('productsList', products);
    
});