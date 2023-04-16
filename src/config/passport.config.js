/* imports */
import passport from 'passport';
import GitHubStrategy from 'passport-github2';
import local from 'passport-local';

import UserService from '../services/user.service.js';
import Config from './config.js'


const userService = new UserService();
const LocalStrategy = local.Strategy;

const initializePassport = () => {

  passport.serializeUser((user, done) => {
    if(user.email === admin.email){
      return done(null, admin.email)
    } 
    return done(null, user.email);
  });

  passport.deserializeUser(async (email, done) => {
    if(email === admin.email){
      return done(null, admin)
    }
    const user = await userService.getUserByEmail(email);
    return done(null, user);
  });

  passport.use('register', new LocalStrategy(
    {
      passReqToCallback: true,
      usernameField: 'email',
    },
    async (req, email, password, done) => {
      try {
        const newUser = req.body;
        const userCreated = await userService.addUser(newUser);
        return done(null, userCreated);
      } catch (error) {
        console.log(`[ERROR] ${error.message}`);
        return done(null, false, { message: 'Error creating user' });
      }
    }
  ))

  passport.use('login', new LocalStrategy(
    {
      usernameField: 'email',
    },
    async (email, password, done) => {
      try {
        const user = await userService.authUser(email, password);
          if (!user){
            return done(null, false, { message: 'Email or password is incorrect' });
          }
        return done(null, user);
      } catch (error) {
        console.log(`[ERROR] ${error.message}`);
        return done(null, false, { message: 'Error loggin user' });
      }
    }

  ))

  passport.use(new GitHubStrategy({
      clientID: Config.GITHUB_CLIENT_ID,
      clientSecret: Config.GITHUB_CLIENT_SECRET,
      callbackURL: Config.GITHUB_CALLBACK_URL,
      scope : ['user:email']
    }, async (accessToken, refreshToken, profile, done) => {
      try{
        const user = await userService.getUserByEmail(profile.emails[0].value);
        return done(null, user);
      }catch(error){
        const newUser = {
          first_name: profile._json.login,
          last_name: profile._json.login,
          email: profile.emails[0].value,
          age: 18,
          password: ''
        }
  
        const userCreated = await userService.addUserByThirdParty(newUser);
        return done(null, userCreated);
      }
    })
  );
}



export default initializePassport;