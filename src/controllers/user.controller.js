export default class UserController{
  constructor(userService){
    this.userService = userService;

    //setting context to this
    Object.getOwnPropertyNames(UserController.prototype).forEach((key) => {
      if (key !== 'constructor' && key !== 'UserService') {
        this[key] = this[key].bind(this);
      }
    });
  }


  async getUsers(req, res){
    try{
      const users = await this.userService.getUsers();
      res.status(200).json({ status: 'success', payload: users });

    }catch (error){
      console.log(`[ERROR] ${error.message}`);
      res.status(400).json({ status: 'error', error: error.message });
    }
  }

  async addUser(req, res){
    try{
      const user = req.body;
      const newUser = await this.userService.addUser(user);
      res.status(201).json({ status: 'success', payload: newUser });

    }catch (error){
      console.log(`[ERROR] ${error.message}`);
      res.status(400).json({ status: 'error', error: error.message });
    }
  }

}