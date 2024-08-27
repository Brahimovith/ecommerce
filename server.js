import express from 'express';
import route from './routes/index.js';
const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use('/',route);

app.listen(port,()=>{
    console.log("server listning in port 5000");
})

