"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const pg_1 = require("pg");
const db_1 = require("./db");
const pool = new pg_1.Pool({
    connectionString: 'postgresql://postgres:postgres@localhost:5432/ping_pong?sslmode=disable',
    max: 20,
    idleTimeoutMillis: 3000,
    ssl: {
        rejectUnauthorized: false,
    },
});
exports.db = new db_1.DB(pool);
