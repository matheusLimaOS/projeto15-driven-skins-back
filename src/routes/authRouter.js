import { Router } from "express";
import {Register} from "../controllers/authControllers.js";

const authRouter = Router()
authRouter.post('/register', Register)

export default authRouter