import Router from "koa-router";
import {db} from "../db/pool";


const router = new Router();

router.get(`/ping`, async (ctx) => {
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