import {Router} from 'express';
import cuser from '../controllers/cuser.js'
import auth from '../controllers/authuser.js';
import produits from '../controllers/products.js';
import order from '../controllers/order.js';
import purchases from '../controllers/purchase.js';
import cadmin from '../controllers/cadmin.js';

const route = Router();
route.post('/user',cuser.create);
route.post('/admin',cadmin.create);
route.get('/connect',auth.connexion)
route.get('/disconnect',auth.deconnexion);
route.get('/user/me');
route.post('/addproducts',produits.addproduct);
route.get('/allproducts', produits.listallproduct);
route.get('/productid',produits.oneproduct);
route.post('/delproduct',produits.delproduct)
route.post('/order',order.placeorder);
route.get('/allorders', order.allcommande);
route.post('/delorder', order.delorder);
route.get('/purchase',purchases.purchase);




export default route;

