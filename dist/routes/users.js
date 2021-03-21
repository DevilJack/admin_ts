"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const pool_1 = require("../db/pool");
const router = new koa_router_1.default();
router.get('/users', users);
async function users(ctx) {
    const users = await pool_1.db.query("select name from users;");
    await ctx.render('content', { usersList: users });
}
exports.default = router;
