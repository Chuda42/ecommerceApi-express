export default class LoggerTestController{
  constructor(){
    //setting context to this
    Object.getOwnPropertyNames(LoggerTestController.prototype).forEach((key) => {
      if (key !== 'constructor') {
        this[key] = this[key].bind(this);
      }
    });
  }

  async testLogger(req, res){
    const { logType, logMsg } = req.body;

    switch(logType){
      case 'fatal':
        req.logger.fatal(logMsg);
        break;
      case 'error':
        req.logger.error(logMsg);
        break;
      case 'warning':
        req.logger.warning(logMsg);
        break;
      case 'info':
        req.logger.info(logMsg);
        break;
      case 'http':
        req.logger.http(logMsg);
        break;
      case 'debug':
        req.logger.debug(logMsg);
        break;
      default:
        req.logger.info(logMsg);
        break;
    }
    res.status(200).send({ status: 'success', message: 'Log sent'})
  }

}