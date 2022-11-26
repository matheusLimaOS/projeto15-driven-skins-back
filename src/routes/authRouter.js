import { Router } from "express";
import { Register, SignIn } from "../controllers/authControllers.js";
import { verifySignIn } from "../middlewares/authMiddlewares.js";
const authRouter = Router()

authRouter.post('/register', Register)
authRouter.post('/login', verifySignIn, SignIn)

export default authRouter