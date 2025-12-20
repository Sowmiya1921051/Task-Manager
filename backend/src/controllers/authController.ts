import { Request, Response } from 'express';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';
import { z } from 'zod';

const registerSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
});

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});


export const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const validation = registerSchema.safeParse(req.body);
        if (!validation.success) {
            res.status(400).json({ message: validation.error.issues[0].message });
            return;
        }

        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }

        const user = await User.create({
            name,
            email,
            password,
        });

        if (user) {
            generateToken(res, user._id);
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};


export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const validation = loginSchema.safeParse(req.body);
        if (!validation.success) {
            res.status(400).json({ message: validation.error.issues[0].message });
            return;
        }
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (user && (await (user as any).matchPassword(password))) {
            generateToken(res, user._id);
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const logoutUser = (req: Request, res: Response) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: 'none',
    });
    res.status(200).json({ message: 'Logged out successfully' });
};
