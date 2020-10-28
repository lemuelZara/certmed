import { hash } from 'bcryptjs';

import IHashProvider from './IHashProvider';

export class BCryptHashProvider implements IHashProvider {
  public async generateHash(password: string): Promise<string> {
    return hash(password, 8);
  }
}
