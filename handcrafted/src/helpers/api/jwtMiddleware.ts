import { Request, Response, NextFunction } from 'express';
import { expressjwt } from 'express-jwt';
import jwt, { VerifyErrors } from 'jsonwebtoken';
import util from 'util';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();

export default function jwtMiddleware(req: Request, res:Response) {
const middleware = expressjwt({ secret: serverRuntimeConfig.secret, algorithms: ['HS256'] }).unless({
  path: [
      // public routes that don't require authentication
      '/api/users/register',
      '/api/users/authenticate'
  ]
});

return util.promisify(middleware)(req, res);
}