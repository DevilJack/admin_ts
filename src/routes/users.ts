import Router from "koa-router";
import {db} from "../db/pool";


const router = new Router();


router.get('/users', users);

async function users(ctx: any) {
    const users = await db.query("select name from users;");
    await ctx.render('content', { usersList: users });
}

export default router;