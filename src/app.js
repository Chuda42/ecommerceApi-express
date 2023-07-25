/* imports */
import express from 'express';
import handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import path from 'path';
import passport from 'passport';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';


import Utils from './utils.js';
import { addLogger, logger } from './logger.js';
import Config from './config/config.js';
import ServerIo from './config/socket.server.js';
import initializePassport from './config/passport.config.js'

import MongoConnection from './persistence/mongo/config/mongoConnection.config.js';

import viewRouter from './routers/view.router.js';
import productRouter from './routers/product.router.js';
import cartRouter from './routers/cart.router.js';
import chatRouter from './routers/chat.router.js';
import sessionRouter from './routers/session.router.js';
import smsRouter  from './routers/sms.router.js';
import mailRouter from './routers/mail.router.js';
import userRouter from './routers/user.router.js';
import mockingRouter from './routers/mocking.router.js'
import loggerTestRouter from './routers/loggerTest.router.js'

/* app */
const app = express();

const swaggerOptions = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Ecommerce API',
      version: '1.0.0',
      description: 'Ecommerce API. This API offers a simplified set of endpoints to manage crucial e-commerce operations. It enables users to create, read, update, and delete product listings, providing essential details such as product name, description, price, and availability. Additionally, the API supports user authentication and authorization mechanisms to ensure secure access to sensitive data. ',
    }
  },
  apis: [`${Utils.__dirname}/docs/**/*.yaml`]
}

const spects = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(spects));

/* handlebars settings */
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(Utils.__dirname, 'views'));
app.use(cors())

/* settings */
app.use(express.static('public'));

/* middlewares */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/* session settings */
app.use(session(MongoConnection.getSessionStore(Config.DB_URL, Config.SESSION_TTL, Config.SESSION_SECRET)));

/* passport settings */
initializePassport()
app.use(passport.initialize());
app.use(passport.session());

/* db connection */
MongoConnection.connect(Config.DB_URL)

/* logger */
app.use(addLogger)

/* routes */
app.use('/', viewRouter);
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/api/chats', chatRouter);
app.use('/api/sessions', sessionRouter);
app.use('/api/sms', smsRouter);
app.use('/api/mail', mailRouter);
app.use('/api/users', userRouter);
app.use('/api/mockingproducts', mockingRouter);
app.use('/api/loggerTest', loggerTestRouter);

/* http server */
const httpServer = app.listen(Config.SERVER_PORT, () => {
  logger.info(`[SERVER] Server listen on port ${Config.SERVER_PORT}`);
});
httpServer.on('error', (err) =>{
  logger.info(`[SERVER] Server error: ${err}`);
})

/* websocket server */
const io = new ServerIo(httpServer);
io.init();

/* set io server */
app.set('io', io);