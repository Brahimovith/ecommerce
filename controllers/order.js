import redisClient from "../utils/redis.js";
import dbase from "../utils/db.js";
import { ObjectId } from "mongodb";


class order{
    static async placeorder(req, res){
        const {id,produit, quantity} = req.body;
        const quantityint = parseInt(quantity, 10);
        let idd = new ObjectId(id);
        console.log(idd);
        const au = req.header('Authorization');
        const token = au.split(" ")[1];
        console.log(token);
        const iduser = await redisClient.client.get(token);
        if(!iduser || !id || !produit){
            res.status(400).json({erreur: "unauthorized"});
                     }
        else{
            dbase.dd.collection('products').findOne({_id: idd })
            .then((result)=>{
                if(produit === result.name && quantityint < result.quantity){
                    dbase.dd.collection('order').insertOne({produit, id, quantity, iduser})
                    .then((result)=>{
                        res.status(200).json({id_order: result.insertedId});
                    })
                    .catch((err)=>{
                        res.status(400).json({err});
                    })
                }
                else{
                    res.status(500).json({erreur:"the quantity asked is big or the name of product dosnt exist "});
                }
            })
        }
        
    }
    static async allcommande(req, res){
        dbase.dd.collection('order').find().toArray()
        .then((result)=>{
            res.status(200).json({orders: result});
                })
        .catch((err)=>{
            res.status(400).json({err});
        })
    }
     static async delorder(req, res){
        const {id} = req.body;
        if(!id){
            res.status(400).json({message:" unahthorized"})
        }
        else{
            let ii = new ObjectId(id);
            dbase.dd.collection('order').deleteOne({_id : ii})
            .then((result)=>{
                console.log(result);
                if(result.deletedCount){
                     res.status(200).json({message:"the order is deleted", id: ii});
                }
                else{
                    res.status(500).json({message:"this order doesnt exit"});
                }
            })
            .catch((err)=>{
                res.status(400).json(err);
            })
        }
     }
}

export default order;
