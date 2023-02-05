const httpLogMiddleware = (req, res, next) => {
    console.log(`[${req.method}] ${req.ip} -> ${req.originalUrl}`);
    next();
}

module.exports = httpLogMiddleware;