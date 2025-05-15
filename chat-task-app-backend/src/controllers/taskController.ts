import { Request, Response } from 'express';
import { db } from '../config/db';

export const getTasks = async (req: Request, res: Response) => {
  const { filter } = req.query;
  let query = 'SELECT * FROM tasks';
  if (filter === 'completed') query += ' WHERE status = "completed"';
  else if (filter === 'pending') query += ' WHERE status = "pending"';
  const [rows] = await db.query(query);
  res.json(rows);
};