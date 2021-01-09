import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
  isFilled: boolean;
}

export const Container = styled.div<ContainerProps>`
  border-radius: 1rem;
  border: 2px solid #ccc;
  padding: 0.5rem;
  width: 100%;
  align-items: center;
  display: flex;

  & + div {
    margin-top: 0.8rem;
  }

  ${(props) =>
    props.isErrored &&
    css`
      border-color: #c53030;
      font-size: 1.2rem;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      border-color: #036873;
    `}

  input {
    flex: 1;
    border: 0;
    padding: 1rem;
    font-size: 1.4rem;
  }

  > svg {
    margin-left: 1rem;
    margin-right: 1rem;
    color: #ccc;

    ${(props) =>
      props.isFilled &&
      css`
        color: #036873;
      `}
  }
`;

export const Error = styled(Tooltip)`
  height: 2rem;
  margin-left: 1.6rem;

  svg {
    margin: 0;
  }
`;
