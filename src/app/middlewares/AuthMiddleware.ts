import { Request, Response } from 'express';
import { JsonWebTokenError, verify } from 'jsonwebtoken';
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';

@Middleware({ type: 'before' })
class AuthMiddleware implements ExpressMiddlewareInterface {
  use(request: Request, _: Response, next?: (err?: any) => any): any {
    if (request.path.startsWith('/sessions')) {
      return next();
    }

    const { authorization } = request.headers;

    if (!authorization) {
      throw new JsonWebTokenError('No credentials provided');
    }

    const [bearer, token] = authorization.split(' ');

    if (bearer.toLowerCase() !== 'bearer') {
      throw new JsonWebTokenError('Invalid credentials');
    }

    try {
      verify(token, process.env.ACCESS_TOKEN_SECRET);

      return next();
    } catch (err) {
      console.log(err);
      throw new JsonWebTokenError(err.message || 'Invalid credentials');
    }
  }
}

export default AuthMiddleware;
