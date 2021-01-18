import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  CurrentUser,
} from 'routing-controllers';
import { getRepository } from 'typeorm';

import { User } from '@models/User';
import UserService from '@services/UserService';

export interface IUserInput {
  name: string;
  email: string;
  password: string;
}

@Controller('/users')
class UserController {
  @Get('/me')
  async me(@CurrentUser() user: any) {
    return user;
  }

  @Get()
  async index() {
    const users = await User.find();
    return users;
  }

  @Get('/:slug')
  async show(@Param('slug') slug: string) {
    const user = await getRepository(User)
      .createQueryBuilder()
      .select()
      .where('gh_profile @> :ghProfile OR mail = :slug', {
        ghProfile: { login: slug },
        slug,
      })
      .getOne();

    return user;
  }

  @Post()
  async store(@Body() body: IUserInput) {
    const { name, email, password } = body;

    return UserService.createUser({ name, email, password });
  }
}

export default UserController;
