/* imports */
import { Server } from 'socket.io';

import ProductService from '../services/product.service.js';

/* services */
const productService = new ProductService();

/* websocket server */
export default class ServerIo {
  constructor(httpServer) {
    this.io = new Server(httpServer);
  }

  init() {
    this.io.on('connection', async (socket) => {
      console.log(`[SOCKET] New client connected -> ${socket.id}`);
    
      let products = await productService.getProducts(); //[{title: 'product1', price:8}, {title: 'product2', price:81}]
    
      //let chatService = Factory.getChatService();
      //let messages = await chatService.getMessages();
    
      socket.emit('productsList', products);
      //socket.emit('messagesList', messages);
        
    });
  }
}
