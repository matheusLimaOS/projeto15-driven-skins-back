import db from "../database/db.js";

export async function listAllProducts (req, res) {
    try {
        const listProducts = await db.collection("products").find({owner: 'driven'}).toArray()
        res.status(200).send(listProducts)
    } catch (error) {
        res.status(422).send(error.message)
    }
}

export async function listInventory (req, res) {
    let id = res.locals.userID;
    try {
        const listProducts = await db.collection("inventory").find({_id:id }).toArray()
        res.status(200).send(listProducts)
    } catch (error) {
        res.status(422).send(error.message)
    }
}