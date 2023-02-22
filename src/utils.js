/* imports */
import { fileURLToPath } from "url";
import { dirname } from "path";
import dotenv from 'dotenv';

/* .env config */
dotenv.config();

/* const */
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default class Utils {
  static __dirname = __dirname;
  
  /* PORTS */
  static SERVER_PORT = process.env.SERVER_PORT || 8080;

  /* FS PATH */
  static PRODUCT_PATH = './products.json';
  static CART_PATH = './cart.json'

  /* DB */
  static DB_URL = process.env.DB_URL;  
  static DB_NAME = process.env.DB_NAME || 'ecommerce';
  
  static DB_COLLECTION_PRODUCTS = process.env.DB_COLLECTION_PRODUCTS || 'products';
  static DB_COLLECTION_MESSAGES = process.env.DB_COLLECTION_MESSAGES || 'messages';
  static DB_COLLECTION_CARTS = process.env.DB_COLLECTION_CARTS || 'carts';

  /* ROUTES */
}

