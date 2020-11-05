import { Appointment } from '../../entities/Appointment';
import AppError from '../../errors/AppError';

import { AppointmentRepository } from '../../repositories/Appointment/AppointmentRepository';
import IAppointmentRepository from '../../repositories/Appointment/IAppointmentRepository';
import { DoctorRepository } from '../../repositories/Doctor/DoctorRepository';
import IDoctorRepository from '../../repositories/Doctor/IDoctorRepository';
import { DocumentRepository } from '../../repositories/Document/DocumentRepository';
import IDocumentRepository from '../../repositories/Document/IDocumentRepository';
import IPatientRepository from '../../repositories/Patient/IPatientRepository';
import { PatientRepository } from '../../repositories/Patient/PatientRepository';
import IUserRepository from '../../repositories/User/IUserRepository';
import { UserRepository } from '../../repositories/User/UserRepository';

interface Request {
  date: Date;
  description: string;
  documentType: string;
  filename: string;
  doctor_id: number;
  patient_id: number;
}

export class CreateAppointmentService {
  private appointmentRepository: IAppointmentRepository;

  private documentRepository: IDocumentRepository;

  private doctorRepository: IDoctorRepository;

  private patientRepository: IPatientRepository;

  constructor(
    appointmentRepository: AppointmentRepository,
    documentRepository: DocumentRepository,
    doctorRepository: DoctorRepository,
    patientRepository: PatientRepository,
  ) {
    this.appointmentRepository = appointmentRepository;
    this.documentRepository = documentRepository;
    this.doctorRepository = doctorRepository;
    this.patientRepository = patientRepository;
  }

  public async execute({
    date,
    description,
    documentType,
    filename,
    doctor_id,
    patient_id,
  }: Request): Promise<Appointment> {
    const doctor = await this.doctorRepository.findById(doctor_id);
    const patient = await this.patientRepository.findById(patient_id);

    if (!doctor || !patient) {
      throw new AppError('Paciente e/ou Médico não encontrado!');
    }

    const document = await this.documentRepository.create({
      type: documentType,
      path: filename,
    });

    const appointment = await this.appointmentRepository.create({
      date,
      description,
      doctor,
      patient,
      document,
    });

    return appointment;
  }
}
