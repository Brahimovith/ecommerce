import redisClient from "../utils/redis.js";
import dbase from "../utils/db.js";
import { ObjectId } from "mongodb";

class produits{
    static async addproduct(req, res){
        const au = req.header('Authorization');
        const token = au.split(" ")[1];
        const value = redisClient.client.get(token);
        console.log(token);
        const {name, price,quantity, image, description} = req.body;
        if(!name || !price || !image || !quantity || !description || !value){
            res.status(400).json({error:"one of features of product is missing or you are not authorized"});
        }
        else{
            dbase.dd.collection('admins').findOne()
            const produit = dbase.dd.collection('products');
            produit.insertOne({name, price, quantity,image, description})
            .then((result)=>{
                 res.status(200).json({id:result.insertedId, name});
                })
            .catch((err)=>{
                res.status(400).json({err});
            })
        }
    }
    static async delproduct(req,res){
        const {id} = req.body;
        const au = req.header('Authorization');
        const token = au.split(" ")[1];
        const value = redisClient.client.get(token);
        console.log(typeof(value));
        let idd = new ObjectId(id);
        if(!id){
            res.status(400).json({error:"not authorized"});
        }
        else{
           dbase.dd.collection('admins').findOne({_id:value})
           .then((resultat)=>{
               if(resultat){
                 dbase.dd.collection('products').deleteOne({_id: idd})
                 .then((result)=>{
                      res.status(200).json({message: "product are deleted", id: idd});
                   })
                 .catch((err)=>{
                     res.status(400).json(err);
                  })
               }
               else{
                res.status(400).json({error:"not authorized"});
               }
           })
           .catch((err)=>{
            res.status(400).json(err);
            })
           
        }
    }

    static async listallproduct(req, res){
        const all = dbase.dd.collection('products').find({}).toArray()
        .then((products)=>{
            res.status(200).json({products});
        })



    }

    static async oneproduct(req, res){
        const {id} = req.body;
        let idd = new ObjectId(id);
        console.log(idd);
        if(!id){
            res.status(400).json({error: "you are not authorized"});
        }
        else{
            console.log(idd);
            dbase.dd.collection('products').findOne({_id: idd})
            .then((result)=>{
                result = result.toArray();
                res.status(200).json({result});
            })
            .catch((err)=>{
                console.log("jj");
                res.status(400).json(err);
            })
        }
    }

}


export default produits;
