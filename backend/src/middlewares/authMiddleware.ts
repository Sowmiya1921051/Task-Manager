import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

interface DecodedToken {
    userId: string;
    iat: number;
    exp: number;
}

const protect = async (req: Request, res: Response, next: NextFunction) => {
    let token;

    token = req.cookies.jwt;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as DecodedToken;

            req.user = await User.findById(decoded.userId).select('-password');

            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

export { protect };
