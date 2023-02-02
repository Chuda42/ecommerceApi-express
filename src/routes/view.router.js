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


/* export */
module.exports = viewRouter;