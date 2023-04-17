/* imports */
import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from 'bcrypt';

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
}
