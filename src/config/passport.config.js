/* imports */
import passport from 'passport';
import GitHubStrategy from 'passport-github2';
import local from 'passport-local';
import jwt from 'passport-jwt';

import Factory from '../factory.js'
import Utils from '../utils.js'
import { log } from 'console';

const admin = {
  email: "adminCoder@coder.com",
  first_name: "admin",
  last_name: "admin",
  Age: 0,
  rol: "admin"
}

const LocalStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies){
    token = req.cookies['cookieToken']
  }
  return token
}

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
    const userService = Factory.getUserService();
    const user = await userService.getUserByEmail(email);
    return done(null, user);
  });

  passport.use('jwt', new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
    secretOrKey: Utils.JWT_PRIVATE_KEY
  }, async(jwt_payload, done) => {
    try {
      return done(null, jwt_payload)
    }catch(error){
      console.log('Entra aca error');
      return done(null, false, { message: 'Error' })
    }
  }))

  passport.use('register', new LocalStrategy(
    {
      passReqToCallback: true,
      usernameField: 'email',
    },
    async (req, email, password, done) => {
      const userService = Factory.getUserService();
      if(email === admin.email) {
        return done(null, false, { message: 'Error creating user' });
      }
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
      const userService = Factory.getUserService();
      try {
        let user = {}
        if(email === "adminCoder@coder.com" && password === "adminCod3r123"){
          user = {
            email: "adminCoder@coder.com",
            first_name: "admin",
            last_name: "admin",
            Age: 0,
            rol: "admin"
          }
        }else{
          user = await userService.getUserByEmail(email);
          if (!user){
            return done(null, false, { message: 'Email or password is incorrect' });
          }
          if (!Utils.isValidPassword(password, user.password)){
            return done(null, false, { message: 'Email or password is incorrect' });
          }
        }
        return done(null, user);
      } catch (error) {
        console.log(`[ERROR] ${error.message}`);
        return done(null, false, { message: 'Error loggin user' });
      }
    }

  ))

  passport.use(new GitHubStrategy({
      clientID: Utils.GITHUB_CLIENT_ID,
      clientSecret: Utils.GITHUB_CLIENT_SECRET,
      callbackURL: Utils.GITHUB_CALLBACK_URL,
      scope : ['user:email']
    }, async (accessToken, refreshToken, profile, done) => {

      const userService = Factory.getUserService();
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