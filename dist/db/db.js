"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB = void 0;
const parsers_1 = require("../common/parsers");
class DB {
    constructor(pool, client) {
        this.pool = pool;
        this.client = client;
    }
    async query(sql, args) {
        const client = this.pool || this.client;
        console.log(sql, args);
        const { rows } = await client.query(sql, args);
        console.log(`${sql} -> result ${rows.length} rows`);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return rows;
    }
    async queryForOptional(sql, args) {
        const rows = await this.query(sql, args);
        if (rows.length > 1) {
            throw new Error('В базе несолько строк по запросу');
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return rows[0];
    }
    async queryForOne(sql, args) {
        const row = await this.queryForOptional(sql, args);
        if (!row) {
            throw new Error('Нет данных по запросу');
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return row;
    }
    async queryForNumber(column, sql, args) {
        return parsers_1.parseNumber(await this.queryForOneObject(column, sql, args), column);
    }
    async queryForString(column, sql, args) {
        return parsers_1.parseString(await this.queryForOneObject(column, sql, args), column);
    }
    async queryForOneObject(column, sql, args) {
        const rows = await this.query(sql, args);
        if (rows.length === 0) {
            throw new Error(`Нет такого '${column}' для '${args.toString()}'`);
        }
        if (rows.length > 1) {
            throw new Error(`Оказалось несколько '${column}' для '${args.toString()}'`);
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return rows[0];
    }
    async doInTransaction(action) {
        const client = await this.pool.connect();
        try {
            await client.query('BEGIN');
            const result = await action(new DB(this.pool, client));
            await client.query('COMMIT');
            return result;
        }
        catch (e) {
            await client.query('ROLLBACK');
            throw e;
        }
        finally {
            client.release();
        }
    }
    async stop() {
        await this.pool.end();
    }
}
exports.DB = DB;
