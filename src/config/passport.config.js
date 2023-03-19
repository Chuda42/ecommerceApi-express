/* imports */
import passport from 'passport';
import GitHubStrategy from 'passport-github2';

import Factory from '../factory.js'
import Utils from '../utils.js'

const initializePassport = () => {

  passport.serializeUser((user, done) => {
    done(null, user.email);
  });

  passport.deserializeUser(async (email, done) => {
    const userService = Factory.getUserService();
    const user = await userService.getUserByEmail(email);
    done(null, user);
  });

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
          password: Utils.SECRET_PASS
        }
  
        const userCreated = await userService.addUser(newUser);
        return done(null, userCreated);
      }
    })
  );
}



export default initializePassport;