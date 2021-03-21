"use strict";

import Koa from "koa";
import bodyParser from "koa-bodyparser";
import cors from "koa2-cors";
import logger from "koa-logger";
import { config } from "./config";
import pingRoutes from "./routes/ping";
import mainRoutes from "./routes/main";
import usersRoutes from "./routes/users";
// import views from "koa-views";
import render from "koa-ejs";
import path from "path";


const app = new Koa();

render(app, {
    root: path.join(__dirname, '../public/views'),
    layout: false,
    viewExt: 'ejs',
    cache: false,
    debug: true
});

const PORT = config.port;

app.use(bodyParser());
app.use(
    cors({
        origin: "*"
    })
);
app.use(logger());
app.use(pingRoutes.routes()).use(pingRoutes.allowedMethods());
app.use(usersRoutes.routes()).use(usersRoutes.allowedMethods());
app.use(mainRoutes.routes()).use(mainRoutes.allowedMethods());

const server = app
    .listen(PORT, async () => {
        console.log(`Server listening on port: ${PORT}`);
    })
    .on("error", err => {
        console.error(err);
    });

export default server;