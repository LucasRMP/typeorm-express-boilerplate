import { User } from '@models/User';

export class UserController {
  async store(req, res) {
    console.log({ req, res });
    const user = new User();
    return user;
  }
}
