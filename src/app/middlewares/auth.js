import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  // You can get only the second variable in the array using a comma before.
  // [bearer, token] == [, token]
  const [, token] = authHeader.split(' ');

  try {
    // Promisify take the need of callbacks and handle it in different way
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid Token.' });
  }
};
