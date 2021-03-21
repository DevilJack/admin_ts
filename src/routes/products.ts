import Router from "koa-router";
import {db} from "../db/pool";
import { DefaultState, Context } from 'koa';


const router = new Router<DefaultState, Context>();


router.get('/products', products);

async function products(ctx: Context): Promise<any> {
    const products = await db.query("select * from product;");
    await ctx.render('products', { productsList: products });
}

export default router;