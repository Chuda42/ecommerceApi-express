/* imports */
import passport from "passport";

export const auth = (req, res, next) => {
  if (req.session.user) {
    return next();
  }

  res.redirect('/login');
}

export const isLogged = (req, res, next) => {
  if (!!req.session.user) {
    res.redirect('/');
  }
  next();
}

export const passportCall = (Strategy) => {
  return async (req, res, next) => {
    passport.authenticate(Strategy, function (error, user, info) {
      if(error){
        return next(error)
      }
      if(!user){
        return res.status(401).send({error: info.messages?info.messages: info.toString()});
      }
      req.user = user;
      next();
    })(req, res, next)
  }
}