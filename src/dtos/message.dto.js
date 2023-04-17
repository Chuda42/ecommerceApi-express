export default class MessageDto {
  constructor({_id, user, message}) {
    this.id = _id? _id.toString() : '';
    this.user = user;
    this.message = message;
  }
}