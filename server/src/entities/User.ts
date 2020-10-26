export class User {
  public readonly id: number;

  public name: string;

  public email: string;

  public password: string;

  constructor(props: Omit<User, 'id'>, id?: string) {
    Object.assign(this, props);
  }
}
