import express from 'express';
import { submitContact, getContacts } from '../controller/contactController.js';
import authMiddleware from '../middleware/auth.js';
import adminMiddleware from '../middleware/admin.js';

const contactRouter = express.Router();

contactRouter.post('/submit', submitContact);
contactRouter.get('/list', authMiddleware, adminMiddleware, getContacts);

export default contactRouter;