/* imports */
const Router = require('express');


/* router */
const ViewRouter = Router();

/* http methods */
ViewRouter.get('/',(req, res) => {
    res.render('index', {
        title: 'Home',
        nombre: 'Manu'
    } );
})


/* export */
module.exports = ViewRouter;