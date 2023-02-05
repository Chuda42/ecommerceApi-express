/* imports */
const { Router } = require('express');
const httpLogMiddleware = require('../middleware/httpLog.middleware');
const ProductManager = require('../manager/ProductManager');

/* const */
const PRODCUT_PATH = './products.json';

/* router */
const viewRouter = Router();

/* http methods */
viewRouter.get('/', httpLogMiddleware, async (req, res) => {
    res.render('home', {
        title: 'Home',
        products: await new ProductManager(PRODCUT_PATH).getProducts()
    } );
})

viewRouter.get('/realtimeproducts', httpLogMiddleware,(req, res)=> {
    res.render('realTimeProducts', {
        title: 'Realtime Products'
    });
})


/* export */
module.exports = viewRouter;