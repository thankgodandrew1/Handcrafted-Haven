import { Request, Response, NextFunction } from 'express';
import express from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';
import util from 'util';
import getConfig from 'next/config';

const app = express();
app.use(express.json());

interface ServerRuntimeConfig {
  secret: string;
  // Add other properties as needed
}

const { serverRuntimeConfig }: { serverRuntimeConfig: ServerRuntimeConfig } = getConfig();

const verifyToken = util.promisify<string, string, jwt.VerifyOptions>(jwt.verify);

const jwtMiddleware = () => async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.headers);
    const token = req.headers['authorization']?.replace('Bearer ', '');
    if (!token) {
      throw new Error('No token provided');
    }

    await verifyToken(token, serverRuntimeConfig.secret, { algorithms: ['HS256'] });
    next();
  } catch (err) {
    handleJwtError(err as VerifyErrors, res);
  }
};


const handleJwtError = (err: VerifyErrors, res: Response) => {
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ message: 'Invalid Token' });
  }
  console.error(err);
  return res.status(500).json({ message: err.message });
};

export default jwtMiddleware;
