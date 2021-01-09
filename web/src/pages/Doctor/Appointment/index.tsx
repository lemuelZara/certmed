import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Input from '../../../components/Input';
import TextArea from '../../../components/TextArea';

import Select from '../../../components/Select';
import FileInput from '../../../components/FileInput';
import { Container, Content } from './styles';
import { AddIcon } from '../../../assets/index';
import api from '../../../services/api';

import { useToast } from '../../../hooks/toast';

interface PatientData {
  id: number;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

interface PatientOptions {
  value: number;
  label: string;
}

const Appointment = () => {
  const { addToast } = useToast();
  const formRef = useRef<FormHandles>(null);
  const [patients, setPatients] = useState<PatientOptions[]>([]);
  const history = useHistory();

  useEffect(() => {
    api.get<PatientData[]>('/patients').then((response) => {
      const patientsFormatted = response.data.map((patient) => {
        return {
          value: patient.user.id,
          label: patient.user.name,
        };
      });

      setPatients(patientsFormatted);
    });
  }, []);

  const handleSubmit = useCallback(
    async (data: any) => {
      const formData = new FormData();

      formData.append('description', data.description);
      formData.append('document_type', data.documentType);
      formData.append('document', data.document);
      formData.append('patient', data.patient);

      api
        .post('/doctors/appointments', formData)
        .then((response) => {
          addToast({
            type: 'success',
            title: 'Sucesso ao assinar documento',
            description: 'Seu documento foi assinado com sucesso!',
          });

          history.goBack();
        })
        .catch(() => {
          addToast({
            type: 'error',
            title: 'Erro ao assinar documento',
            description: 'Não foi possível assinar seu documento!',
          });
        });
    },
    [addToast, history],
  );

  return (
    <Container>
      <Content>
        <section>
          <AddIcon />

          <h1>Cadastrar nova consulta</h1>

          <p>Descreva as informações necessárias relacionadas a consulta</p>

          <Link to="/doctor/profile">Voltar para sua Dashboard</Link>
        </section>

        <Form ref={formRef} onSubmit={handleSubmit}>
          <TextArea
            name="description"
            type="text"
            placeholder="Descrição da consulta"
          />
          <Select name="patient" placeholder="Pacientes" options={patients} />
          <Input
            name="documentType"
            type="text"
            placeholder="Tipo do documento"
          />
          <FileInput
            name="document"
            type="file"
            placeholder="Insira o documento da consulta aqui"
          />

          <button type="submit">Cadastrar</button>
        </Form>
      </Content>
    </Container>
  );
};

export default Appointment;
