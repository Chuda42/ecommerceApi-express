/* imports */
const express = require('express');

/* app */
const SERVER_PORT = 8081;
const app = express();

/* middlewares */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* routes */
app.use('/api/products', require('./routes/product.router'));
app.use('/api/carts', require('./routes/cart.router'));

/* server */
const server = app.listen(SERVER_PORT, () => {
    console.log(`Server on port ${SERVER_PORT}`);
});
server.on('error', (err) =>{
    console.log(`Server error: ${err}`);
})
