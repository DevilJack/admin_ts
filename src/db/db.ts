import {Pool, PoolClient} from 'pg';
import {parseNumber, parseString} from "../common/parsers";

export class DB {
    constructor(private readonly pool: Pool, private readonly client?: PoolClient) {}

    async query(sql: string, args?: any[]): Promise<any> {
        const client = this.pool || this.client;
        console.log(sql, args);
        const { rows } = await client.query(sql, args);
        console.log(`${sql} -> result ${rows.length} rows`);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return rows;
    }

    async queryForOptional(sql: string, args: any[]): Promise<any | undefined> {
        const rows = await this.query(sql, args);
        if (rows.length > 1) {
            throw new Error('В базе несолько строк по запросу');
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return rows[0];
    }

    async queryForOne(sql: string, args: any[]): Promise<any> {
        const row = await this.queryForOptional(sql, args);
        if (!row) {
            throw new Error('Нет данных по запросу');
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return row;
    }

    async queryForNumber(column: string, sql: string, args: any[]): Promise<number> {
        return parseNumber(await this.queryForOneObject(column, sql, args), column)
    }

    async queryForString(column: string, sql: string, args: any[]): Promise<string> {
        return parseString(await this.queryForOneObject(column, sql, args), column);
    }

    private async queryForOneObject(column: string, sql: string, args: any[]): Promise<any> {
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

    async doInTransaction<T>(action: (tr: DB) => Promise<T>): Promise<T> {
        const client = await this.pool.connect();
        try {
            await client.query('BEGIN');
            const result = await action(new DB(this.pool, client));
            await client.query('COMMIT');
            return result;
        } catch (e) {
            await client.query('ROLLBACK');
            throw e;
        } finally {
            client.release();
        }
    }

    async stop(): Promise<void> {
        await this.pool.end();
    }
}