import express from 'express'
import { loginUser,registerUser , getUsers, getProfile, updateProfile} from '../controller/userController.js'
import authMiddleware from '../middleware/auth.js'
import adminMiddleware from '../middleware/admin.js'

const userRouter = express.Router()

userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)
userRouter.get("/profile", authMiddleware, getProfile);
userRouter.put("/profile", authMiddleware, updateProfile);
userRouter.get("/users", authMiddleware, adminMiddleware, getUsers);
export  default  userRouter;