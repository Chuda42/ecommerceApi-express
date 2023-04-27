/* imports */
import CartDao from './mongo/daos/cart.dao.js'
import MessageDao from './mongo/daos/message.dao.js'
import ProductDao from './mongo/daos/product.dao.js'
import UserDao from './mongo/daos/user.dao.js'
import TicketDao from './mongo/daos/ticket.dao.js'

import ProductManager from './filesystem/daos/product.manager.js'
import CartManager from './filesystem/daos/cart.manager.js'
import UserManager from './filesystem/daos/user.manager.js'
import MessageManager from './filesystem/daos/message.manager.js'
import TicketManager from './filesystem/daos/ticket.manager.js'


export default class FactoryDaos {
  
  static getUserDao(key) {    
    const userDao = new Map();
    userDao.set('mongo', UserDao);
    userDao.set('filesystem', UserManager)

    const DaoClass = userDao.get(key);
    const dao = new DaoClass();
    return dao;

  }

  static getProductDao(key) {
    const productDao = new Map();
    productDao.set('mongo', ProductDao);
    productDao.set('filesystem', ProductManager)

    const DaoClass = productDao.get(key);
    const dao = new DaoClass();
    return dao;
  }

  static getCartDao(key) {
    const cartDao = new Map();
    cartDao.set('mongo', CartDao);
    cartDao.set('filesystem', CartManager)

    const DaoClass = cartDao.get(key);
    const dao = new DaoClass();
    return dao;
  }

  static getMessageDao(key) {
    const messageDao = new Map();
    messageDao.set('mongo', MessageDao);
    messageDao.set('filesystem', MessageManager)

    const DaoClass = messageDao.get(key);
    const dao = new DaoClass()
    return dao;
  }

  static getTicketDao(key) {
    const ticketDao = new Map();
    ticketDao.set('mongo', TicketDao);
    ticketDao.set('filesystem', TicketManager)

    const DaoClass = ticketDao.get(key);
    const dao = new DaoClass()
    return dao;
  }

}