import sha1 from "sha1";
import dbase from "../utils/db.js";
import redisClient from "../utils/redis.js";
import {v4 as uuidv4} from 'uuid'; 

class auth{
    static async connexion(req,res){
        const {isadmin} = req.body;
        const au = req.header('Authorization');
        let um = au.split(" ")[1];
        const decoded = Buffer.from(um, 'base64').toString('ascii');
        console.log(decoded);
        if(decoded.split(":").length !== 2)
        {
            res.status(400).json({error:"unathorized"});
        }
        else{
            const email = decoded.split(":")[0];
            console.log(email);
            const password = sha1(decoded.split(":")[1]);
            if(!isadmin)
            {
                const users = dbase.dd.collection('users');
                users.findOne({email})
                .then((resultat)=>{
                     console.log(resultat);
                     if(resultat){
                         console.log(resultat);
                         console.log(resultat['pass']);
                         console.log(password);

                        if(password===resultat['pass'])
                         {
                           redisClient.client.get(resultat._id.toString())  
                           const token = uuidv4();
                           console.log(token);
                           redisClient.client.set(token,resultat._id.toString(), 24*60*60);
                           res.status(200).json({token});
                        }
                       else{
                           res.status(404).json({error:"mot de passe incorecte"});
                           }
                    
                       }
                    else{
                         res.status(400).json({error:"unathorizoed 2"});
                       }
                 })
                .catch((err)=>{
                   res.status(400).json({error:"unathorizoed 1"});
                })
            }
            else{
                const admin = dbase.dd.collection('admins');
                admin.findOne({email})
                .then((resultat)=>{
                     console.log(resultat);
                     if(resultat){
                         console.log(resultat);
                         console.log(resultat['pass']);
                         console.log(password);

                        if(password===resultat['pass'])
                         {
                           redisClient.client.get(resultat._id.toString())  
                           const token = uuidv4();
                           console.log(token);
                           redisClient.client.set(token,resultat._id.toString(), 24*60*60);
                           res.status(200).json({token});
                        }
                       else{
                           res.status(404).json({error:"mot de passe incorecte"});
                           }
                    
                       }
                    else{
                         res.status(400).json({error:"unathorizoed 2"});
                       }
                 })
                .catch((err)=>{
                   res.status(400).json({error:"unathorizoed 1"});
                })
            }
        }
            
}

    static async deconnexion(req,res){
        const token = req.headers['x-token'];
        console.log(token);
        const id = await redisClient.client.get(token);
        if(id){
            console.log(id);
            redisClient.client.del(token);
            res.status(200).json({});
        }
        else{
            res.status(400).json({error:"unauthorized"});
        }


    }
   
}

export default auth;
