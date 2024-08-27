import { MongoClient } from 'mongodb';

const HOST = process.env.DB_HOST || 'localhost';
const PORT = process.env.DB_PORT || 27017;
const url = mongodb://${HOST}:27017;

class dabase {

  constructor(){
      this.client = new MongoClient('mongodb://localhost:27017');
      try{
          this.client.connect();
          this.dd = this.client.db('ecom');
       } catch(err){
          console.log(err);
       }
  }
}
const dbase = new dabase();
export default dbase;
