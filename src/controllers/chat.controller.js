/**
 * class ChatController
 */
export default class ChatController{
  constructor(chatService){
    this.chatService = chatService;

    //setting context to this
    Object.getOwnPropertyNames(ChatController.prototype).forEach((key) => {
      if (key !== 'constructor' && key !== 'productService') {
        this[key] = this[key].bind(this);
      }
    });
  }

  async getMessages(req, res){
    try {
      const messageList = await this.chatService.getMessages();

      res.status(200).json(messageList);
    } catch (error) {
      console.log(`[ERROR] ${error.message}`);
      res.status(400).json({ status: 'error', error: error.message });
    }
  }

  async addMessage(req, res){
    try {
      const message = req.body;

      let newMessage = await this.chatService.addMessage(message);

      /* get io server */
      //req.app.get('io').sockets.emit('newMessage', newMessage);

      res.status(200).json({ status: 'ok', message: 'Added message' });
    } catch (error) {
      console.log(`[ERROR] ${error.message}`);
      res.status(400).json({ status: 'error', error: error.message });
    }
  }
}