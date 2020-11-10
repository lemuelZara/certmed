import { Request, Response } from 'express';
import fs from 'fs';

import { PDFSignerProvider } from '../providers/SignProvider/PDFSignerProvider';

import { AppointmentRepository } from '../repositories/Appointment/AppointmentRepository';
import { DoctorRepository } from '../repositories/Doctor/DoctorRepository';
import { DocumentRepository } from '../repositories/Document/DocumentRepository';
import { PatientRepository } from '../repositories/Patient/PatientRepository';

import { CreateAppointmentService } from '../services/Appointment/CreateAppointmentService';
import { FindDoctorByIDService } from '../services/Doctor/FindDoctorByIdService';
import { SignDocumentService } from '../services/Document/SignDocumentService';

export class AppointmentController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { filename, path } = request.file;
    const {
      date,
      description,
      document_type,
      patient: patient_id,
    } = request.body;
    const { id } = request.user;

    const doctor_id = parseInt(id, 10);

    const appointmentRepository = new AppointmentRepository();
    const documentRepository = new DocumentRepository();
    const doctorRepository = new DoctorRepository();
    const patientRepository = new PatientRepository();

    const signProvider = new PDFSignerProvider();

    const appointmentService = new CreateAppointmentService(
      appointmentRepository,
      documentRepository,
      doctorRepository,
      patientRepository,
    );
    const doctorService = new FindDoctorByIDService(doctorRepository);
    const documentService = new SignDocumentService(signProvider);

    const doctor = await doctorService.execute({ id: doctor_id });

    await documentService.execute({
      signer: doctor.user.name,
      path_certificate: './assets/evandrocertificado.pfx',
      password_certificate: 'telerad!.sao',
      path_document: path,
    });

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
