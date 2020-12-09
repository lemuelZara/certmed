import React, { useEffect, useState } from 'react';

import { FaPowerOff, FaFilePdf } from 'react-icons/fa';

import { useAuth } from '../../../hooks/auth';

import { Container, Header } from './styles';
import { ProfileIcon } from '../../../assets/index';
import api from '../../../services/api';

interface AppointmentData {
  id: number;
  date: Date;
  description: string;
  doctor: {
    id: number;
    user: {
      id: number;
      name: string;
      email: string;
    };
  };
  patient: {
    id: number;
    user: {
      id: number;
      name: string;
      email: string;
    };
  };
  document: {
    id: number;
    type: string;
    path: string;
  };
}

interface AppointmentFormatted {
  id: number;
  date: string;
  description: string;
  doctorName: string;
  patientName: string;
  documentType: string;
  documentPath: string;
}

const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth();

  const [appointments, setAppointments] = useState<AppointmentFormatted[]>([]);

  useEffect(() => {
    api.get<AppointmentData[]>('/patients/appointments').then((response) => {
      const appointmentsFormatted = response.data.map((appointment) => {
        const data = new Date(appointment.date);

        const dateFormatted = `${data.getDate()}/${
          data.getMonth() + 1
        }/${data.getFullYear()}`;

        return {
          id: appointment.id,
          date: dateFormatted,
          description: appointment.description,
          doctorName: appointment.doctor.user.name,
          patientName: appointment.patient.user.name,
          documentType: appointment.document.type,
          documentPath: appointment.document.path,
        };
      });

      setAppointments(appointmentsFormatted);
    });
  }, []);

  const handleClick = (documentPath: string) => {
    window.location.href = `http://localhost:3333/files/${documentPath}`;
  };

  return (
    <Container>
      <Header>
        <ProfileIcon />
        <span>Bem vindo(a), {user.name}</span>

        <button type="button" onClick={signOut}>
          <FaPowerOff size={20} color="#4ad295" />
        </button>
      </Header>

      <h1>Consultas feitas</h1>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment.id}>
            <strong>Descrição</strong>
            <p>{appointment.description}</p>

            <strong>Doutor</strong>
            <p>{appointment.doctorName}</p>

            <strong>Data da consulta</strong>
            <p>{appointment.date}</p>

            <strong>Documento</strong>
            <p>{appointment.documentType}</p>

            <button
              type="button"
              onClick={() => handleClick(appointment.documentPath)}
            >
              <FaFilePdf size={20} color="#fff" />
              <span>Visualizar documento</span>
            </button>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default Dashboard;
