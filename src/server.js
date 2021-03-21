"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const koa2_cors_1 = __importDefault(require("koa2-cors"));
const koa_logger_1 = __importDefault(require("koa-logger"));
const config_1 = require("./config");
const ping_1 = __importDefault(require("./routes/ping"));
const app = new koa_1.default();
const PORT = config_1.config.port;
app.use(koa_bodyparser_1.default());
app.use(koa2_cors_1.default({
    origin: "*"
}));
app.use(koa_logger_1.default());
app.use(ping_1.default.routes());
const server = app
    .listen(PORT, async () => {
    console.log(`Server listening on port: ${PORT}`);
})
    .on("error", err => {
    console.error(err);
});
exports.default = server;
