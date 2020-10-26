import { PostgresUserRepository } from '../../repositories/implementations/PostgresUserRepository';
import { CreateUser } from './CreateUser';
import { CreateUserController } from './CreateUserController';

const postgresUserRepository = new PostgresUserRepository();

const createUser = new CreateUser(postgresUserRepository);

const createUserController = new CreateUserController(createUser);

export { createUser, createUserController };
