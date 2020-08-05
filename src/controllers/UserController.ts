import { User } from '@models/User';

class UserController {
  async index(req, res) {
    console.log(User);
    return res.status(200).json({ hello: 'world', User });
  }

  async find(req, res) {
    return new User();
  }

  async store(req, res) {}
}

export default new UserController();
