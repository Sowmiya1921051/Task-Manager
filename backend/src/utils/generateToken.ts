import jwt from 'jsonwebtoken';
import { Response } from 'express';

const generateToken = (res: Response, userId: any) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET || 'secret', {
        expiresIn: '30d',
    });

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: true, // Required for sameSite: 'none'
        sameSite: 'none', // Allow cross-site cookies
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });
};

export default generateToken;
