import Router from "koa-router";
import {db} from "../db/pool";


const router = new Router();


router.get('/', home);

async function home(ctx: any) {
    await ctx.render('home', { text: 'this is home page' });
}

export default router;