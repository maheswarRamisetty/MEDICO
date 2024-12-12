import express from 'express'
import authUser from '../middlewares/authUser.js';
import { getAllProducts,addProducts } from '../controllers/productController.js';

const productRouter = express.Router()

productRouter.get('/products',getAllProducts);
productRouter.post('/add-products',addProducts);



export default productRouter;