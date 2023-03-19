/* imports */
import { Router } from 'express';
import passport from 'passport'

import httpLogMiddleware from '../middlewares/httpLog.middleware.js';
import Factory from '../factory.js';

/* controller */
const sessionController = Factory.getSessionController();

/* Router */
const sessionRouter = Router();

/* Routes middlewares */
sessionRouter.use(httpLogMiddleware);

/* http methods */
sessionRouter.route('/login')
             .post(sessionController.loginUser)
      
sessionRouter.route('/register')
             .post(sessionController.registerUser)

sessionRouter.route('/logout')
             .post(sessionController.logoutUser)

sessionRouter.route('/github')
             .get(passport.authenticate('github', {scope:['user:email']}), async (req, res) => {})
          
sessionRouter.route('/githubcallback')
             .get(passport.authenticate('github', {failureRedirect: '/login'}), sessionController.gitHubSession)


/* export */
export default sessionRouter;