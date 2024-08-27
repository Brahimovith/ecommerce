import { createClient } from 'redis';
import {promisify} from 'util';
class redisclient{
    constructor(){
        this.client = createClient();
        this.client.connect();
        this.client.on('error', (err)=>{
            console.log(err);
        });
        this.client.on('connect',(msg)=>{
            console.log(msg);
        });
      }
    }
    
    const redisClient = new redisclient();
    
export default redisClient;
