import Router from "koa-router";
import {db} from "../db/pool";
import { DefaultState, Context } from 'koa';


const router = new Router<DefaultState, Context>();

router.get('/', home);

async function home(ctx: Context): Promise<any> {
    await ctx.render('home', { text: 'this is home page' });
}

export default router;