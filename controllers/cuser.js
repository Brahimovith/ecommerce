import dbase from "../utils/db.js";
import redisClient from "../utils/redis.js";
import sha1 from 'sha1';



class cuser{
    static create(req, res){
        const {email, password} = req.body;
        if(!email){
            res.status(400).json({error: 'missing email'});
        }
        
        if(!password){
            res.status(400).json({error: 'missing password'})
        }

        const users = dbase.dd.collection('users');
        users.findOne({email})
        .then((resultat)=>{
            if(resultat){
                res.status(400).json({error: 'alredy exist'});
            }
            else{
                const pass = sha1(password);
                users.insertOne({email, pass})
                .then((resu)=>{
                    console.log(Buffer.from("brahim@moi.com:123").toString('base64'));
                    res.status(200).json({id:resu.insertedId,email});
                })
                .catch((err)=>{
                    res.status(400).json({error:err});
                })

            }
        })
        .catch((err)=>{
            res.status(400).json({error:err});
        })
        

        
        
        }

    }


export default cuser;
