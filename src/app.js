/* imports */
import express from 'express';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import path from 'path';

import Utils from './utils.js';
import Factory from './Factory.js'

import viewRouter from './routers/view.router.js';
import productRouter from './routers/product.router.js';
import cartRouter from './routers/cart.router.js';
import chatRouter from './routers/chat.router.js';
import sessionRouter from './routers/session.router.js';
//import userRouter from './routers/user.router.js';

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

/* session settings */
app.use(session({
  store: MongoStore.create({ 
    mongoUrl: Utils.DB_URL,
    mongoOptions: {
			useNewUrlParser: true,
			useUnifiedTopology:true
		},
    ttl: Utils.SESSION_TTL
  }),
  secret: Utils.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

/* Db conection */
mongoose.set('strictQuery', true);
mongoose.connect(Utils.DB_URL, (error) => {
  if (error) {
    console.log(`[DB] Error: ${error.message}`);
    process.exit()
  } else {
    console.log(`[DB] Connected`);
  }
})

/* routes */
app.use('/', viewRouter);
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/api/chats', chatRouter);
app.use('/api/sessions', sessionRouter);

/* http server */
const httpServer = app.listen(Utils.SERVER_PORT, () => {
  console.log(`[SERVER] Server listen on port ${Utils.SERVER_PORT}`);
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

  let productService = Factory.getProductService();
  let products = await productService.getProducts(); //[{title: 'product1', price:8}, {title: 'product2', price:81}]

  let chatService = Factory.getChatService();
  let messages = await chatService.getMessages();

  socket.emit('productsList', products);
  socket.emit('messagesList', messages);
    
});