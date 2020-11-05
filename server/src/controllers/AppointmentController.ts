import { Request, Response } from 'express';
import { AppointmentRepository } from '../repositories/Appointment/AppointmentRepository';
import { DoctorRepository } from '../repositories/Doctor/DoctorRepository';
import { DocumentRepository } from '../repositories/Document/DocumentRepository';
import { PatientRepository } from '../repositories/Patient/PatientRepository';
import { CreateAppointmentService } from '../services/Appointment/CreateAppointmentService';

export class AppointmentController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { filename } = request.file;
    const {
      date,
      description,
      document_type,
      patient: patient_id,
    } = request.body;
    const { id } = request.user;

    const appointmentRepository = new AppointmentRepository();
    const documentRepository = new DocumentRepository();
    const doctorRepository = new DoctorRepository();
    const patientRepository = new PatientRepository();

    const appointmentService = new CreateAppointmentService(
      appointmentRepository,
      documentRepository,
      doctorRepository,
      patientRepository,
    );

    const doctor_id = parseInt(id, 10);

    const appointment = await appointmentService.execute({
      date,
      description,
      documentType: document_type,
      filename,
      doctor_id,
      patient_id,
    });

    return response.status(201).json(appointment);
  }
}
