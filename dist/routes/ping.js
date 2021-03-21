"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const pool_1 = require("../db/pool");
const router = new koa_router_1.default();
router.get(`/ping`, async (ctx) => {
    try {
        const result = await pool_1.db.queryForString("name", "select * from users where id=$1;", [1]);
        ctx.body = {
            status: "success",
            data: result
        };
    }
    catch (err) {
        console.error(err);
    }
});
exports.default = router;
