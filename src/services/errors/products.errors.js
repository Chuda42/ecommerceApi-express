export default class ProductErrors{
  static createError({ name='error', cause, message, code=1 }){
    let error = new Error(message, { cause });
    error.name = name;
    error.code = code;
    throw error
  }
}