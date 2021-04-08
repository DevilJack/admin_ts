import Router from "koa-router";
import {db} from "../db/pool";
import { DefaultState, Context } from 'koa';
import {Product} from "../models/Product";
import {productService} from "../services/ProductService";


const router = new Router<DefaultState, Context>();


router.get('/products', products)
    .post('/addProduct', addProduct);

async function products(ctx: Context): Promise<any> {
    const products = await db.query("select * from product;");
    await ctx.render('products', { productsList: products });
}

// curl --header "Content-Type: application/json" --request POST --data '{"title": "пиво", "description": "самое вкусное", "image_url": "", "price": "1000", "sale_price": "500", "available": "true"}' localhost:3000/addProduct

async function addProduct(ctx: Context): Promise<any> {
    const body = ctx.request.body;
    const product = new Product(
        body.title,
        body.description,
        body.image_url,
        body.price,
        body.sale_price,
        body.available
    );

    ctx.body = await productService.addProduct(product);
}

export default router;