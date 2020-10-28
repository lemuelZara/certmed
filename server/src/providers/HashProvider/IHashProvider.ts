export default interface IHashProvider {
  generateHash(password: string): Promise<string>;
}
