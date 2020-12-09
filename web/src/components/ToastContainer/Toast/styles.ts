import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

interface ContainerProps {
  type?: 'success' | 'error' | 'info';
  hasdescription: number;
}

const toastTypeVariations = {
  info: css`
    background: #fff;
    color: #036873;
  `,
  success: css`
    background: #036873;
    color: #fff;
  `,
  error: css`
    background: #720e03;
    color: #fff;
  `,
};

export const Container = styled(animated.div)<ContainerProps>`
  width: 36rem;
  position: relative;
  padding: 1.6rem 3rem 1.6rem 1.6rem;
  border-radius: 1rem;
  box-shadow: 0.2rem 0.2rem 0.8rem rgba(0, 0, 0, 0.2);
  display: flex;

  & + div {
    margin-top: 0.4rem;
  }

  ${(props) => toastTypeVariations[props.type || 'info']}

  align-items: center;
  opacity: 0.9;

  svg {
    margin-right: 1.2rem;
  }

  div {
    flex: 1;

    strong {
      font-weight: 700;
    }

    p {
      margin-top: 0.4rem;
      opacity: 0.8;
      line-height: 2rem;
    }
  }

  button {
    position: absolute;
    right: -0.6rem;
    top: 0.6rem;
    border: 0;
    background: transparent;
    color: inherit;
  }

  ${(props) =>
    !props.hasdescription &&
    css`
      button {
        position: initial;
        border: 0;
        background: transparent;
        color: inherit;

        > svg {
          margin-bottom: -0.4rem;
        }
      }
    `}
`;
