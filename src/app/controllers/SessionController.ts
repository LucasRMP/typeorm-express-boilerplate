import { Response } from 'express';
import {
  Controller,
  Body,
  Get,
  Post,
  CurrentUser,
  NotFoundError,
  Res,
} from 'routing-controllers';

import { User } from '@models/User';
import UserService from '@services/UserService';

import { IUserInput } from './UserController';

interface ILoginInput {
  email: string;
  password: string;
}

@Controller('/sessions')
class UserController {
  @Get()
  async show(@CurrentUser() user: any) {
    return user;
  }

  @Post('')
  async login(@Res() res: Response, @Body() body: ILoginInput) {
    const { email, password } = body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return UserService.login(user, { email, password }, res);
  }

  @Post('/register')
  async register(@Body() body: IUserInput, @Res() res: Response) {
    const { email, password, name } = body;

    const user = await UserService.create({ email, password, name });

    return UserService.login(
      user,
      {
        email,
        password,
      },
      res
    );
  }
}

export default UserController;
