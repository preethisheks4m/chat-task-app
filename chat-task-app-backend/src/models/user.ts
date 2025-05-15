import { db } from '../config/db';

export const createUser = async (email: string, password: string) => {
  const [rows] = await db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, password]);
  return rows;
};

export const findUserByEmail = async (email: string) => {
  const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  return (rows as any)[0];
};