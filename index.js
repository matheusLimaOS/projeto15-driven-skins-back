import express from "express";
import cors from "cors";
import authRouter from "./src/routes/authRouter.js";
import dotenv from 'dotenv'
const app = express();

dotenv.config()

app.use(express.json())
app.use(cors());
app.get("/status",(req,res)=>{
    return res.send("OK");
})

app.use(authRouter)

app.listen(process.env.PORT || 3000,console.log('On The Line'));