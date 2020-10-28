import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Type } from './Type';
import { Doctor } from './Doctor';
import { Patient } from './Patient';

/**
 * ManyToOne: muitos 'Usuários' que pertencem a um único 'Tipo'
 *
 * OneToMany: um User contém apenas uma instância de Doctor
 */

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @ManyToOne(() => Type, (type) => type.users, {
    cascade: ['insert', 'update', 'remove'],
  })
  @JoinColumn({ name: 'type_id' })
  type: Type;

  // A entidade 'User' pode pertencer a muitas entidades de 'Doctor'
  @OneToMany(() => Doctor, (doctor) => doctor.user, {
    cascade: ['insert', 'update', 'remove'],
  })
  @JoinColumn({ name: 'user_id' })
  doctors: Doctor[];

  // A entidade 'User' pode pertencer a muitas entidades de 'Patient'
  @OneToMany(() => Patient, (patient) => patient.user, {
    cascade: ['insert', 'update', 'remove'],
  })
  @JoinColumn({ name: 'user_id' })
  patients: Patient[];
}
