/* imports */
import express from 'express';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import handlebars from 'express-handlebars';
import path from 'path';
import Utils from './utils.js';

import viewRouter from './routers/view.router.js';
import productRouter from './routers/product.router.js';
import MongoContainer from './dao/mongo.container.js';
import ProductService from './services/product.service.js';
import ProductSchema from './dao/models/product.schema.js';
import cartRouter from './routers/cart.router.js';
import chatRouter from './routers/chat.router.js';

import ChatService from './services/chat.service.js';
import MessageSchema from './dao/models/message.schema.js';

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

  let perisitenceManager = new MongoContainer(Utils.DB_COLLECTION_PRODUCTS, ProductSchema);
  let productService = new ProductService(perisitenceManager)
  let products = await productService.getProducts(); //[{title: 'product1', price:8}, {title: 'product2', price:81}]

  let chatService = new ChatService(new MongoContainer(Utils.DB_COLLECTION_MESSAGES, MessageSchema));
  let messages = await chatService.getMessages();

  socket.emit('productsList', products);
  socket.emit('messagesList', messages);
    
});