import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Doctor } from './Doctor';
import { Document } from './Document';
import { Patient } from './Patient';

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  date: Date;

  @Column()
  description: string;

  @ManyToOne(() => Doctor, (doctor) => doctor.appointments)
  @JoinColumn({ name: 'doctor_id' })
  doctor: Doctor;

  @ManyToOne(() => Patient, (patient) => patient.appointments)
  @JoinColumn({ name: 'patient_id' })
  patient: Patient;

  @ManyToOne(() => Document, (document) => document.appointments, {
    cascade: ['insert', 'update', 'remove'],
  })
  @JoinColumn({ name: 'document_id' })
  document: Document;
}
