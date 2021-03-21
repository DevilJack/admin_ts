import Router from "koa-router";
import {db} from "../db/pool";
import { DefaultState, Context } from 'koa';


const router = new Router<DefaultState, Context>();

router.get(`/ping`, async (ctx: Context): Promise<any> => {
    try {
        const result = await db.queryForString("name", "select * from users where id=$1;", [1]);

        ctx.body = {
            status: "success",
            data: result
        };
    } catch (err) {
        console.error(err);
    }
});

export default router;