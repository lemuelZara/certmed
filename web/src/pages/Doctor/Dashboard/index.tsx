import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { FaPowerOff, FaFilePdf } from 'react-icons/fa';

import { Container, Header } from './styles';
import { ProfileIcon } from '../../../assets/index';
import api from '../../../services/api';
import { useAuth } from '../../../hooks/auth';

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
  const [appointments, setAppointments] = useState<AppointmentFormatted[]>([]);
  const { signOut, user } = useAuth();

  useEffect(() => {
    api.get<AppointmentData[]>('/doctors/appointments').then((response) => {
      const appointmentsFormatted = response.data.map((appointment) => {
        const data = new Date(appointment.date);

        const dataFormatada = `${data.getDate()}/${
          data.getMonth() + 1
        }/${data.getFullYear()}`;

        return {
          id: appointment.id,
          date: dataFormatada,
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
        <span>Bem vindo(a), Dr. {user.name}</span>

        <Link to="/doctor/appointment">Cadastrar uma nova consulta</Link>

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

            <strong>Paciente</strong>
            <p>{appointment.patientName}</p>

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
