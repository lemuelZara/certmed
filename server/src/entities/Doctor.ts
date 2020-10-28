import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from './User';

// ManyToOne: muitos 'Users' vão pertencer a entidade de 'Doctor'

@Entity('doctors')
export class Doctor {
  @PrimaryGeneratedColumn('increment')
  id: number;

  // Para fazer a relação dar certo, a entidade 'Doctor' vai guardar uma
  // entidade de 'User'
  @ManyToOne(() => User, (user) => user.doctors)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
