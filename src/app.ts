import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { verify } from 'jsonwebtoken';
import { join } from 'path';
import { useExpressServer } from 'routing-controllers';
import { createConnection } from 'typeorm';

import 'dotenv/config';
import 'reflect-metadata';
import { User } from '@models/User';
import {
  createAccessToken,
  createRefreshToken,
  getPayloadFromRequest,
  sendRefreshToken,
} from '@utils/auth';

createConnection().then(() => {
  const server = express();

  server.use(bodyParser.json());
  server.use(cookieParser());
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(
    cors({
      origin: process.env.WEB_APP_URL,
      credentials: true,
    })
  );

  server.post('/refresh_token', async (req, res) => {
    const token = req.cookies.rmp;

    if (!token) {
      return res.json({ ok: false, accessToken: '' });
    }

    let payload: any;
    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
    } catch (err) {
      console.log(err);
      return res.json({ ok: false, accessToken: '' });
    }

    const user = await User.findOne({ where: { id: payload.userId } });

    if (!user || user.tokenVersion !== payload.tokenVersion) {
      return res.json({ ok: false, accessToken: '' });
    }

    sendRefreshToken(res, createRefreshToken(user));

    return res.json({ ok: true, accessToken: createAccessToken(user) });
  });

  const appBaseUrl = join(__dirname, 'app');
  useExpressServer(server, {
    controllers: [join(appBaseUrl, 'controllers', '*.ts')],
    middlewares: [join(appBaseUrl, 'middlewares', '*.ts')],
    currentUserChecker: ({ request }) => getPayloadFromRequest(request),
  });

  server.listen(process.env.PORT || 3333, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
  });
});
