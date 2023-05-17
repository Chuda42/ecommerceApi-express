/* imports */
import { logger } from '../../../logger.js'

import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';


export default class MongoConnection {

  /* Db conection */
  static connect = (dbUrl) => {
    mongoose.set('strictQuery', true);
    mongoose.connect(dbUrl, (error) => {
      if (error) {
        console.log(`[DB] Error: ${error.message}`);
        process.exit()
      } else {
        logger.info(`[DB] Connected`);
      }
    })
  }

  static getSessionStore = (mongoUrl, sessionTTL, sessionSecret) => {
    return {
      store: MongoStore.create({ 
        mongoUrl: mongoUrl,
        mongoOptions: {
          useNewUrlParser: true,
          useUnifiedTopology:true
        },
        ttl: sessionTTL
      }),
      secret: sessionSecret,
      resave: false,
      saveUninitialized: false,
    }
  
  }

} 


