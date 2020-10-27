import { createConnection } from 'typeorm';

createConnection().then(() => console.log('[TypeORM] Successful connection.'));
