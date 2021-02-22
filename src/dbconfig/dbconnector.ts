import { Pool } from 'pg';

export default new Pool ({
    max: 20,
    connectionString: process.env.DATABASE_URL || 'postgres://postgres:123456@localhost:5432/encurtador',
    idleTimeoutMillis: 30000,
    ssl: { rejectUnauthorized: false }
});