import axios from 'axios';
import { compare } from 'bcrypt';
import { Response } from 'express';

import { IUserInput } from '@controllers/UserController';
import { User } from '@models/User';
import {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
} from '@utils/auth';

interface ILoginInput {
  email: string;
  password: string;
}

class UserService {
  async create(payload: IUserInput) {
    const { data: ghProfile } = await axios.get(
      `https://api.github.com/users/${payload.name}`
    );

    const user = await User.create({ ...payload, ghProfile }).save();
    return user;
  }

  async login(user: User, input: ILoginInput, res: Response) {
    const checkPassword = await compare(input.password, user.password);
    if (!checkPassword) {
      throw new Error('Wrong password');
    }

    sendRefreshToken(res, createRefreshToken(user));

    const accessToken = createAccessToken(user);

    return {
      accessToken,
      user,
    };
  }
}

export default new UserService();
