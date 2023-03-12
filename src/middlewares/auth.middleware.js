export const auth = (req, res, next) => {
  if (req.session.user) {
    next();
    return;
  }

  res.redirect('/login');
}

export const isLogged = (req, res, next) => {
  if (!!req.session.user) {
    res.redirect('/');
  }
  next();
}