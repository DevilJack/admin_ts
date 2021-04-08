import Router from "koa-router";
import {db} from "../db/pool";
import {Context, DefaultState} from 'koa';
import {IUser} from "../types/interfaces";
import {User} from "../models/User";
import {userService} from "../services/UserService";


const router = new Router<DefaultState, Context>();

router.get('/users', users)
    .post('/addUser', addUser);

async function users(ctx: Context): Promise<any> {
    const users = await db.query("select * from users;");
    await ctx.render('users', { usersList: users });
}

// curl --header "Content-Type: application/json" --request POST --data '{"email":"zhozhpost@gmail.com", "name":"zhozh", "role": "superuser", "gender": "male"}' localhost:3000/addUser

async function addUser(ctx: Context): Promise<any> {
    const body = ctx.request.body;
    const user = new User(
        body.email,
        body.password,
        body.name,
        body.avatar_url,
        body.gender,
        body.ageRange,
        body.role
    );

    ctx.body = await userService.addUser(user);
}

export default router;