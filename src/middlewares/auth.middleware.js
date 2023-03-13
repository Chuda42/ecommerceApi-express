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