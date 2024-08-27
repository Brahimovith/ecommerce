import dbase from "../utils/db.js";
import redisClient from "../utils/redis.js";
import sha1 from 'sha1';



class cadmin{
    static create(req, res){
        const {email, password, isadmin} = req.body;
        if(!email || !isadmin || !password){
            res.status(400).json({error: 'missing email or you are not admin'});
        }
        else{
          const admins = dbase.dd.collection('admins');
          admins.findOne({email})
          .then((resultat)=>{
              if(resultat){
                   res.status(400).json({error: 'alredy exist'});
                  }
              else{
                  const pass = sha1(password);
                  admins.insertOne({email, pass})
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
        

        
        
        }}

    }


export default cadmin;
