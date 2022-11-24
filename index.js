import express from "express";
import cors from "cors";
import authRouter from "./src/routes/authRouter.js";
import dotenv from 'dotenv'
import userRouter from "./src/routes/userRouter.js";
const app = express();

dotenv.config()

app.use(express.json())
app.use(cors());
app.get("/status",(req,res)=>{
    return res.send("OK");
})

app.use(authRouter)
app.use(userRouter)

app.listen(process.env.PORT || 3000,console.log('On The Line'));