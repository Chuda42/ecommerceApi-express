const httpLogMiddleware = (req, res, next) => {
  req.logger.http(`[${req.method}] ${req.ip} -> ${req.originalUrl} - ${new Date().toLocaleString()}`);
  next();
}

export default httpLogMiddleware;