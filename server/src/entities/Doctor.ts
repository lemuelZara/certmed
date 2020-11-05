import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Appointment } from './Appointment';

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

  @OneToMany(() => Appointment, (appointment) => appointment.doctor, {
    cascade: ['insert', 'update', 'remove'],
  })
  @JoinColumn({ name: 'doctor_id' })
  appointments: Appointment[];
}
