import { Router } from "express";
import { listAllProducts } from "../controllers/userControllers.js";
const userRouter = Router ()

userRouter.get('/listproducts', listAllProducts)

export default userRouter