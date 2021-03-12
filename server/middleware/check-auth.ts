import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();
const { JWT_KEY } = process.env;

export const isAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, JWT_KEY);
    req.user = decoded;

    if (!req.user.admin) {
      next();
    } else {
      res.status(401).json({ message: 'It is only for user.' });
    }
  } catch (error) {
    res.status(401).json({ message: 'Auth failed!' });
  }
};

export const isAdmin = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, JWT_KEY);
    req.user = decoded;

    if (req.user.admin) {
      next();
    } else {
      res.status(401).json({ message: 'Not an admin, sorry' });
    }
  } catch (error) {
    res.status(401).json({ message: 'Auth failed!' });
  }
};
