import { User } from '@models/User';

class UserController {
  static async index(req, res) {
    const users = await User.find();
    return res.status(200).json({ users });
  }
}

export default UserController;
