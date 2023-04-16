/* imports */
//import CartDao from './daos/cart.dao.js'
//import MessageDao from './mongo/daos/message.dao.js'
import ProductDao from './mongo/daos/product.dao.js'
//import UserDao from './mongo/daos/user.dao.js'


export default class FactoryDaos {
  
  /*static getUserDao(key) {    
    const userDao = new Map();
    userDao.set('mongo', UserDao);

    const dao = new userDao.get(key);
    return dao;

  }*/

  static getProductDao(key) {
    const productDao = new Map();
    productDao.set('mongo', ProductDao);
    //productDao.set('filesystem', ProductDaoFileSystem)

    const DaoClass = productDao.get(key);
    const dao = new DaoClass();
    return dao;
  }

  /*static getCartDao(key) {
    const cartDao = new Map();
    cartDao.set('mongo', CartDao);
    //cartDao.set('filesystem', CartDaoFileSystem)

    const dao = new cartDao.get(key);
    return dao;
  }*/

  /*static getMessageDao(key) {
    const messageDao = new Map();
    messageDao.set('mongo', MessageDao);

    const dao = new messageDao.get(key);
    return dao;
  }*/

}