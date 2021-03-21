import { Pool } from 'pg';
import { DB } from './db';

const pool = new Pool({
    connectionString: 'postgresql://postgres:postgres@localhost:5432/ping_pong?sslmode=disable',
    max: 20,
    idleTimeoutMillis: 3000,
    ssl: {
        rejectUnauthorized: false,
    },
});

export const db = new DB(pool);