/* imports */
import express from 'express';
import handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';
//import session from 'express-session';
import path from 'path';
//import passport from 'passport';

import Utils from './utils.js';
import Config from './config/config.js'
//import ServerIo from './config/socket.server.js';
//import Factory from './factory.js'
//import initializePassport from './config/passport.config.js'

import MongoConnection from './persistence/mongo/config/mongoConnection.config.js';

//import viewRouter from './routers/view.router.js';
import productRouter from './routers/product.router.js';
import cartRouter from './routers/cart.router.js';
//import chatRouter from './routers/chat.router.js';
//import sessionRouter from './routers/session.router.js';
import userRouter from './routers/user.router.js';

/* app */
const app = express();

/* handlebars settings */
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(Utils.__dirname, 'views'));

/* settings */
app.use(express.static('public'));

/* middlewares */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/* db connection */
MongoConnection.connect(Config.DB_URL)


/* routes */
//app.use('/', viewRouter);
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

/* http server */
const httpServer = app.listen(Config.SERVER_PORT, () => {
  console.log(`[SERVER] Server listen on port ${Config.SERVER_PORT}`);
});
httpServer.on('error', (err) =>{
  console.log(`[SERVER] Server error: ${err}`);
})

/* websocket server */
//const io = new ServerIo(httpServer);
//io.init();

/* set io server */
//app.set('io', io);