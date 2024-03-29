export const auth = (req, res, next) => {
  if (req.session.user) {
    return next();
  }

  res.redirect('/login');
}

export const isNotLogged = (req, res, next) => {
  if (req.session && req.session.user) {
    return res.redirect('/');
  }
  return next();
}

export const isLogged = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  }
  return res.redirect('/login');
}

export const isAdmin = (req, res, next) => {
  if (req.session && req.session.user && req.session.rol === 'admin') { // User is authenticated and is admin
      return next();
  }
  return res.redirect('/login'); // User is not authenticated or is not admin, redirect to home
};

export const isUser = async (req, res, next) => { 
  if (req.session && req.session.user && req.session.rol === 'user' || req.session.rol === 'premium') { // User is authenticated and is admin
    return next();
}
return res.redirect('/login'); // User is not authenticated or is not admin, redirect to home
  
}

export const isAdminOrPremium = (req, res, next) => {
  if (req.session && req.session.user && (req.session.rol === 'admin' || req.session.rol === 'premium')) { // User is authenticated and is admin
      return next();
  }
  req.logger.error(`[ERROR] ${req.session.user} is not admin or premium`)
  return res.redirect('/login'); // User is not authenticated or is not admin, redirect to home
}