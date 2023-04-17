/* imports */
import { Server } from 'socket.io';

import ProductService from '../services/product.service.js';
import ChatService from '../services/chat.service.js'

/* services */
const productService = new ProductService();
const chatService = new ChatService();

/* websocket server */
export default class ServerIo {
  constructor(httpServer) {
    this.io = new Server(httpServer);
  }

  init() {
    this.io.on('connection', async (socket) => {
      console.log(`[SOCKET] New client connected -> ${socket.id}`);
    
      let products = await productService.getProducts(); //[{title: 'product1', price:8}, {title: 'product2', price:81}]
    
      let messages = await chatService.getMessages();
    
      socket.emit('productsList', products);
      socket.emit('messagesList', messages);
        
    });
  }

  emitSockets(event, data) {
    this.io.sockets.emit(event, data)
  }

}
