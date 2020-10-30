import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve('.env'),
});

export const { SECRET_KEY } = process.env;
export const { TOKEN_EXPIRATION_TIME } = process.env;
