import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from './User';

// ManyToOne: muitos 'Users' vão pertencer a entidade de 'Patient'

@Entity('patients')
export class Patient {
  @PrimaryGeneratedColumn('increment')
  id: number;

  // Para fazer a relação dar certo, a entidade 'Patient' vai guardar uma
  // entidade de 'User'
  @ManyToOne(() => User, (user) => user.patients)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
