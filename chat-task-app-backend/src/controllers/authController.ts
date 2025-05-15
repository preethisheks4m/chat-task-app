import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail } from '../models/user';
export const register = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      await createUser(email, hashedPassword);
      res.status(201).send('User registered');
    } catch (err) {
      res.status(500).send('Error registering user');
    }
  };
  
  export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (!user) return res.status(400).send('Invalid credentials');
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send('Invalid credentials');
  
    const token = jwt.sign({ id: user.id, email: user.email }, 'secret_key', { expiresIn: '1h' });
    res.json({ token });
  };