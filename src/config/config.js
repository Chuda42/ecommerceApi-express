/* imports */
import dotenv from 'dotenv';

/* .env config */
dotenv.config();

export default class Config{

  /* PORTS */
  static SERVER_PORT = process.env.SERVER_PORT;

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

  /* ADMIN */
  static ADMIN_EMAIL = process.env.ADMIN_EMAIL;
  static ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

  /* MAIL */
  static MAIL_SERVICE = process.env.MAIL_SERVICE;
  static MAIL_PORT = process.env.MAIL_PORT;
  static MAIL_USER = process.env.MAIL_USER;
  static MAIL_PASS = process.env.MAIL_PASS;

  /* SMS */
  static SMS_SERVICE = process.env.SMS_SERVICE;
  static SMS_SID = process.env.SMS_SID;
  static SMS_TOKEN = process.env.SMS_TOKEN;
  static SMS_FROM = process.env.SMS_FROM;

  /* LOGS */
  static LOGS_ENV = process.env.LOGS_ENV;

  /* TEST */
  static TEST_EMAIL = process.env.TEST_EMAIL;
  static TEST_PASSWORD = process.env.TEST_PASSWORD;

  /* STRIPE */
  static STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

}