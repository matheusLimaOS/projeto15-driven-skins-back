import joi from "joi";
import db from "../database/db.js";
import bcrypt from 'bcrypt'

const registerSchamer = joi.object({
    name: joi.string().required(),
    email: joi.string().required(),
    password: joi.string().required(),
    confirmPassword: joi.string().required()
})

export async function Register (req, res) {

    const infoRegister = req.body

    const validation = registerSchamer.validate(infoRegister, {abortEarly: false})

    if(validation.error){
        res.status(401).send(validation.error.message)
        return
    }

    if(infoRegister.password !== infoRegister.confirmPassword){
        res.status(401).send("Erro na confimação de senha")
        return
    }

    try {
        const emailUserExist = await db.collection('users').findOne({email: infoRegister.email})
        if(emailUserExist){
            res.status(409).send('email já existente')
            return
        }

        const passwordCrypt = bcrypt.hashSync(infoRegister.password, 10)

        await db.collection('users').insertOne({ name: infoRegister.name, email: infoRegister.email, password: passwordCrypt})
        res.sendStatus(201)

        
    } catch (error) {
        res.send(422).send(error.message)
        return
    }
    
    

}