import joi from 'joi';
import {stripHtml} from "string-strip-html";
import db from '../database/db.js';

const signInSchema = joi.object({
    email: joi.string().required(),
    password: joi.string().required(),
})

export async function verifyToken(req,res,next){
    let {token} = req.headers;

    let find = await db.collection("sessions").findOne({token:token});

    if(find){
        res.locals.userID = find.userId;
        next();
    }
    else{
        res.status(401).send("Sessão não encontrada");
    }
}

export async function verifySignIn(req,res,next){
    let {email,password} = req.body;
    let user = {
        email: stripHtml(email === undefined ? "" : email).result.trim(),
        password: stripHtml(password === undefined ? "" : password).result.trim(),
    };

    let validation = signInSchema.validate(user,{abortEarly:false});

    if(validation.error){
        const erros = validation.error.details.map((detail) => detail.message);
        res.status(422).send(erros);
        return;
    }
    else{   
        let find = await db.collection("users").find({email:user.email}).toArray();

        if(find.length > 0){
            res.locals.user = {
                email:email,
                password:password
            };
            next();
        }
        else{
            res.status(422).send("Email não encontrado!");
        }
    }
}

