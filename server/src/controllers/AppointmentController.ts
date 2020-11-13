import { Request, Response } from 'express';

import { PDFSignerProvider } from '../providers/SignProvider/PDFSignerProvider';

import { AppointmentRepository } from '../repositories/Appointment/AppointmentRepository';
import { DoctorRepository } from '../repositories/Doctor/DoctorRepository';
import { DocumentRepository } from '../repositories/Document/DocumentRepository';
import { PatientRepository } from '../repositories/Patient/PatientRepository';

import { CreateAppointmentService } from '../services/Appointment/CreateAppointmentService';
import { ListAppointmentDoctorService } from '../services/Appointment/ListAppointmentDoctorService';
import { ListAppointmentPatientService } from '../services/Appointment/ListAppointmentPatientService';
import { FindDoctorByIDService } from '../services/Doctor/FindDoctorByIdService';
import { SignDocumentService } from '../services/Document/SignDocumentService';
import { FindPatientByIdService } from '../services/Patient/FindPatientByIdService';

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

  public async showAppointmentDoctor(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.user;

    const doctor_id = parseInt(id, 10);

    const appointmentRepository = new AppointmentRepository();
    const doctorRepository = new DoctorRepository();

    const appointmentService = new ListAppointmentDoctorService(
      appointmentRepository,
    );
    const doctorService = new FindDoctorByIDService(doctorRepository);

    const doctor = await doctorService.execute({ id: doctor_id });

    const appointments = await appointmentService.execute({
      id: doctor.id,
    });

    const newAppointments = appointments.map((appointment) => {
      delete appointment.doctor.user.password;
      delete appointment.patient.user.password;

      return appointment;
    });

    return response.status(200).json(newAppointments);
  }

  public async showAppointmentPatient(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.user;

    const patient_id = parseInt(id, 10);

    const appointmentRepository = new AppointmentRepository();
    const patientRepository = new PatientRepository();

    const appointmentService = new ListAppointmentPatientService(
      appointmentRepository,
    );
    const patientService = new FindPatientByIdService(patientRepository);

    const patient = await patientService.execute({ id: patient_id });

    const appointments = await appointmentService.execute({
      id: patient.id,
    });

    const newAppointments = appointments.map((appointment) => {
      delete appointment.doctor.user.password;
      delete appointment.patient.user.password;

      return appointment;
    });

    return response.status(200).json(newAppointments);
  }
}
