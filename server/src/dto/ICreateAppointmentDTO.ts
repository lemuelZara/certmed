import ICreateDoctorDTO from './ICreateDoctorDTO';
import ICreateDocumentDTO from './ICreateDocumentDTO';
import ICreatePatientDTO from './ICreatePatientDTO';

export default interface ICreateAppointmentDTO {
  date: Date;
  description: string;
  doctor: ICreateDoctorDTO;
  patient: ICreatePatientDTO;
  document: ICreateDocumentDTO;
}
