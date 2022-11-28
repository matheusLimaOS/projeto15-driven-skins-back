import { Router } from "express";
import { listAllProducts, listInventory } from "../controllers/userControllers.js";
import { verifyToken } from "../middlewares/authMiddlewares.js";
import { verifyUser } from "../middlewares/userMiddlewares.js";
const userRouter = Router ()

userRouter.get('/listproducts', listAllProducts)
userRouter.get('/listInventory', verifyToken,verifyUser,listInventory)

export default userRouter