import styled from 'styled-components';

interface IInputFloating {
  isActive: boolean;
}

export const Main = styled.main`
  width: 100vw;
  height: 100vh;

  display: grid;
  grid-template-columns: 37% 63%;
  grid-template-rows: 100vh;
`;

export const SectionLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background: #fff;

  > svg {
    width: 10rem;
    height: auto;
  }

  h2 {
    margin-top: 3.2rem;
    font-weight: bold;
  }

  form {
    width: 100%;
    max-width: 32rem;

    margin-top: 3.2rem;
  }
`;

export const SectionRight = styled.div`
  display: flex;

  img {
    max-width: 100%;

    object-fit: cover;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;

  width: 100%;
  max-width: 32rem;

  margin-top: 3.2rem;
`;

export const SigInButton = styled.button`
  margin-top: 2rem;
  width: 100%;
  padding: 1.2rem;
  border: 0;
  border-radius: 0.8rem;
  background: #036873;
  color: #fff;
  font-size: 1.6rem;
  font-weight: 500;
`;
