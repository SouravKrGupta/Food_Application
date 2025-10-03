import express from 'express'
import authMiddleware from '../middleware/auth.js'
import adminMiddleware from '../middleware/admin.js'
import { listOrders, placeOrder, updateStatus, userOrders, verifyorder } from '../controller/orderController.js'

const orderRouter = express.Router();

orderRouter.post('/place',authMiddleware,placeOrder);
orderRouter.post('/verify',verifyorder);
orderRouter.post('/userorders',authMiddleware,userOrders)
orderRouter.get('/list', authMiddleware, adminMiddleware, listOrders);
orderRouter.post('/status', authMiddleware, adminMiddleware, updateStatus)
export default orderRouter;