/* imports */
const express = require('express');
const { Server } = require('socket.io');
const handlebars = require('express-handlebars');
const path =  require('path');
const prodMan = require('./manager/ProductManager');

/* const */
const PRODUCT_PATH = './products.json';

/* app */
const SERVER_PORT = 8081;
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

/* routes */
app.use('/',  require('./routes/view.router'));
app.use('/api/products', require('./routes/product.router'));
app.use('/api/carts', require('./routes/cart.router'));


/* http server */
const httpServer = app.listen(SERVER_PORT, () => {
    console.log(`Server on port ${SERVER_PORT}`);
});
httpServer.on('error', (err) =>{
    console.log(`Server error: ${err}`);
})

/* websocket server */
const io = new Server(httpServer);


/* websockets */
io.on('connection', async (socket) => {
    console.log('New client connected');

    let products = await new prodMan(PRODUCT_PATH).getProducts();
    console.log(products);

    socket.emit('productsList', products);
    
});