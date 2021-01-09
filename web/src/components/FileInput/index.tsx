import React, { useCallback, useEffect, useRef, useState } from 'react';

import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';

import { Container, Error } from './styles';

interface Props {
  name: string;
}

type InputProps = JSX.IntrinsicElements['input'] & Props;

const FileInput: React.FC<InputProps> = ({ name, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    // inputRef.current?.value != 0, undefined, null, ''
    setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'files[0]',
    });
  }, [fieldName, registerField]);

  return (
    <Container isFocused={isFocused} isErrored={!!error} isFilled={isFilled}>
      <input
        type="file"
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />

      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default FileInput;
