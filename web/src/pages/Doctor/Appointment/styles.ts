import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 120rem;
  height: 100vh;
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  width: 100%;
  padding: 9.6rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  input {
    background: #efefef;
  }

  > section {
    width: 100%;
    max-width: 42rem;

    > svg {
      width: 15rem;
      height: auto;
    }

    > h1 {
      margin: 6.4rem 0 3.2rem;
      font-weight: bold;
      font-size: 3.2rem;
    }

    > p {
      font-size: 1.8rem;
      color: #737380;
    }

    > a {
      display: block;
      margin-top: 8rem;
      width: 30rem;
      height: 6rem;
      background: #036873;
      border: 0;
      border-radius: 0.8rem;
      color: #fff;
      margin-left: auto;
      font-weight: 700;
      display: inline-block;
      text-align: center;
      text-decoration: none;
      font-size: 1.4rem;
      line-height: 6rem;
      transition: filter 0.3s;
    }
  }

  > form {
    width: 100%;
    max-width: 40rem;

    > button {
      margin-top: 2rem;
      width: 100%;
      padding: 1.2rem;
      border: 0;
      border-radius: 0.8rem;
      background: #036873;
      color: #fff;
    }
  }
`;
