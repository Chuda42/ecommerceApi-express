import {EErrors} from '../services/errors/error.enums.js';

export default (err, req, res, next) => {
  console.log(err.cause);

  switch (err.code) {
    case (EErrors.REQUIRED_PARAMS):
      res.status(400).json({status: 'error', error: err.name})
      break;
  
    default:
      res.status(400).json({status: 'error', error: "Unhandle error"})
      break;
  }
}