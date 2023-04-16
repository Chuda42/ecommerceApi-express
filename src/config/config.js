/* imports */
import dotenv from 'dotenv';

/* .env config */
dotenv.config();

export default class Config{

  /* PORTS */
  static SERVER_PORT = process.env.SERVER_PORT || 8080;

  /* DB */
  static DB_URL = process.env.DB_URL;  
  static DB_NAME = process.env.DB_NAME;

  /* SESSION */
  static SESSION_SECRET = process.env.DB_SESSION_SECRET;
  static SESSION_TTL = process.env.DB_SESSION_TTL;

  /* GITHUB */
  static GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
  static GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
  static GITHUB_CALLBACK_URL = process.env.GITHUB_CALLBACK_URL;

  /* PERSISTENCE */
  static PERSISTENCE = process.env.PERSISTENCE;

}