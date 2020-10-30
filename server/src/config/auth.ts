import { SECRET_KEY, TOKEN_EXPIRATION_TIME } from '../utils/environment';

interface IAuthConfig {
  secretKey: string;
  expiresIn: string;
}

export default {
  secretKey: SECRET_KEY,
  expiresIn: TOKEN_EXPIRATION_TIME,
} as IAuthConfig;
