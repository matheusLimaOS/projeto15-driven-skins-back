import { Router } from "express";
import { listAllProducts } from "../controllers/userControllers.js";


const userRouter = Router ()
userRouter.use('/listproducts', listAllProducts)

export default userRouter