import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from './User';

/**
 * OneToMany: um 'Tipo' para muitos 'Usuários'
 */

@Entity('types')
export class Type {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @OneToMany(() => User, (user) => user.type, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'type_id' })
  users: User[];
}
