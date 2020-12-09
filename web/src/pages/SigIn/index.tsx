import React, { useCallback, useRef } from 'react';

import { useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { FiLock, FiMail } from 'react-icons/fi';
import { SecureIcon } from '../../assets/index';
import SectionImage from '../../assets/login.jpg';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import { Main, SectionLeft, SectionRight, SigInButton } from './styles';
import Input from '../../components/Input';
import getValidationErrors from '../../utils/getValidationErrors';

interface SigInFormData {
  email: string;
  password: string;
}

const SigIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const { signIn } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: SigInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .email('Informe um email válido')
            .required('O email é obrigatório'),
          password: Yup.string().required('A senha é obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const user = await signIn({
          email: data.email,
          password: data.password,
        });

        if (user.type.name === 'Médico') {
          history.push('/doctor/profile');
        } else {
          history.push('/patient/profile');
        }
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          formRef.current?.setErrors(errors);
        }

        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer login, cheque as credenciais',
        });
      }
    },
    [signIn, addToast, history],
  );

  return (
    <Main>
      <SectionLeft>
        <SecureIcon />

        <h2>Faça seu Login</h2>

        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input name="email" icon={FiMail} type="email" placeholder="E-mail" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />

          <SigInButton type="submit">Entrar</SigInButton>
        </Form>
      </SectionLeft>
      <SectionRight>
        <img src={SectionImage} alt="" />
      </SectionRight>
    </Main>
  );
};

export default SigIn;
