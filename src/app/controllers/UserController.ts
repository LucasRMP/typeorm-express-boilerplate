import axios from 'axios';
import { RequestHandler } from 'express';
import { getRepository } from 'typeorm';

import { User } from '@models/User';

class UserController {
  static index: RequestHandler = async (_, res) => {
    const users = await User.find();
    return res.status(200).json({ users });
  };

  static show: RequestHandler = async (req, res) => {
    const { slug } = req.params;

    const user = await getRepository(User)
      .createQueryBuilder()
      .select()
      .where('gh_profile @> :ghProfile OR mail = :slug', {
        ghProfile: { login: slug },
        slug,
      })
      .getOne();

    return res.json(user);
  };

  static store: RequestHandler = async (req, res) => {
    const { name, mail, password } = req.body;

    const { data: ghProfile } = await axios.get(
      `https://api.github.com/users/${name}`
    );

    const user = await User.create({ name, mail, password, ghProfile }).save();

    return res.status(201).json(user);
  };
}

export default UserController;
