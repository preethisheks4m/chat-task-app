import express from 'express';
import multer from 'multer';
import { register, login } from '../controllers/authController';
import { importChat } from '../controllers/chatController';
import { getTasks } from '../controllers/taskController';
import { authenticateToken } from '../middlewares/auth';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/register', register);
router.post('/login',login);
router.post('/import-chat', authenticateToken, upload.single('file'), importChat);
router.get('/tasks', authenticateToken, getTasks);

export default router;