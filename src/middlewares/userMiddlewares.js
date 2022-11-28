import { ObjectId } from "mongodb";
import {stripHtml} from "string-strip-html";
import db from '../database/db.js';

export async function verifyUser(req,res,next){
    let userID = ObjectId(req.headers.UserID);
    let find = await db.collection("users").find({_id:userID}).toArray();
    
    if(find.length > 0){
        if(userID !== res.locals.UserID){
            res.status(401).send("Usuário diferente da sessão");
        }
        else{
            next();
        }
    }
    else{
        res.status(404).send("Usuário não encontrado");
    }
}