import axios from 'axios';
import { Controller, Param, Body, Get, Post } from 'routing-controllers';
import { getRepository } from 'typeorm';

import { User } from '@models/User';

interface IUserInput {
  name: string;
  mail: string;
  password: string;
}

@Controller('/users')
class UserController {
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
    const { name, mail, password } = body;

    const { data: ghProfile } = await axios.get(
      `https://api.github.com/users/${name}`
    );

    const user = await User.create({ name, mail, password, ghProfile }).save();
    return user;
  }
}

export default UserController;
