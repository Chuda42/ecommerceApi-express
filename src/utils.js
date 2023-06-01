/* imports */
import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import { faker } from '@faker-js/faker';
import mongoose, { set } from 'mongoose';

/* const */
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default class Utils {
  
  static __dirname = __dirname;
  
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

  static generateCode = () => {
    /* uuid */
    const code = uuidv4();
    return code;
  }

  static generateToken = () => {
    /* crypto */
    return new Promise((resolve, reject) => {
      crypto.randomBytes(20, (err, buf) => {
        if (err) {
          reject(err);
        }
        resolve(buf.toString('hex'));
      });
    })
  }

  static tokens = {}

  static saveToken = (token) => {
    Utils.tokens[token] = {
      token,
      createdAt: new Date()
    };

    setTimeout(() => {
      Utils.tokens[token] = null
    }
    , 1000 * 60 * 60);

  }

  static isValidToken = (token) => {
    if(!token){
      return false;
    }
    console.log(Utils.tokens[token]);
    return Utils.tokens[token] ? true : false;
  }

  static generateProduct = () => {
    faker.locale = 'es'

    let product = {
      id: faker.database.mongodbObjectId(),
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price(),
      stock: faker.random.numeric(3),
      code: faker.random.alphaNumeric(8),
      thumbnails: [faker.image.imageUrl()],
      category: faker.commerce.department(),
      status: parseInt(faker.random.numeric(1, { allowLeadingZeros: true }, {bannedDigits: ['2', '3', '4', '5', '6', '7', '8', '9']})) ? 'active' : 'inactive'
      };
      return product;
    }
}
