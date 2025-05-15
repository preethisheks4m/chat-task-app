import { Request, Response } from 'express';
import * as XLSX from 'xlsx';
import fs from 'fs';
import { db } from '../config/db';

export const importChat = async (req: Request, res: Response) => {
  const filePath = req.file?.path;
  if (!filePath) return res.status(400).send('No file uploaded');

  const workbook = XLSX.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json(sheet);

  try {
    for (const row of data) {
      const { sender, message, timestamp } = row as any;
      await db.query('INSERT INTO chat_history (sender, message, timestamp) VALUES (?, ?, ?)', [
        sender,
        message,
        timestamp,
      ]);
    }
    fs.unlinkSync(filePath);
    res.send('Chat history imported');
  } catch (err) {
    res.status(500).send('Failed to import');
  }
};