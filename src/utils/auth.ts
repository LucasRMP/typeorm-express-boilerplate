import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { User } from '@models/User';

export function getPayloadFromRequest(req: Request): any {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new Error();
    }

    const [, token] = authorization.split(' ');

    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return payload;
  } catch {
    return null;
  }
}

export function createAccessToken(user: User): string {
  return jwt.sign(
    {
      userId: user.id,
      email: user.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: '10m',
    }
  );
}

export function createRefreshToken(user: User): string {
  return jwt.sign(
    { userId: user.id, tokenVersion: user.tokenVersion },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: '7d',
    }
  );
}

export function sendRefreshToken(res: Response, token: string) {
  res.cookie('rmp', token, {
    httpOnly: true,
  });
}

export async function revokeRefreshTokenForUser(userId: string) {
  await User.getRepository().increment({ id: userId }, 'tokenVersion', 1);
  return true;
}
