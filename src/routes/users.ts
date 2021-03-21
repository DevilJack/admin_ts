import Router from "koa-router";
import {db} from "../db/pool";
import { DefaultState, Context } from 'koa';


const router = new Router<DefaultState, Context>();


router.get('/users', users);

async function users(ctx: Context): Promise<any> {
    const users = await db.query("select * from users;");
    await ctx.render('users', { usersList: users });
}

export default router;