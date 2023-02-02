/* imports */
const { Router } = require('express');


/* router */
const viewRouter = Router();

/* http methods */
viewRouter.get('/',(req, res) => {
    res.render('index', {
        title: 'Home',
        nombre: 'Manu'
    } );
})

viewRouter.get('/realtimeproducts', (req, res)=> {
    res.render('realTimeProducts', {
        title: 'Realtime Products'
    });
})


/* export */
module.exports = viewRouter;