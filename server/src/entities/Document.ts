import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Appointment } from './Appointment';

@Entity('documents')
export class Document {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  type: string;

  @Column()
  path: string;

  @OneToMany(() => Appointment, (appointment) => appointment.document)
  @JoinColumn({ name: 'document_id' })
  appointments: Appointment[];
}
