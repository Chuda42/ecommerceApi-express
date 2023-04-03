/* imports */
import { fileURLToPath } from "url";
import { dirname } from "path";
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

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
  static DB_COLLECTION_USERS = process.env.DB_COLLECTION_USERS || 'users';

  /* SESSION */
  static SESSION_SECRET = process.env.DB_SESSION_SECRET || 's3cr3t';
  static SESSION_TTL = process.env.DB_SESSION_TTL || 120;

  /* GITHUB */
  static GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
  static GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
  static GITHUB_CALLBACK_URL = process.env.GITHUB_CALLBACK_URL;

  /* BCRYPT */
  static createHash = (pass) => {
    return bcrypt.hashSync(pass, bcrypt.genSaltSync(10));
  }

  static isValidPassword = (pass, hash) => {
    if(!pass || !hash){
      return false;
    } 
    return bcrypt.compareSync(pass, hash);
  }

  /* JWT */
  static JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY

}
