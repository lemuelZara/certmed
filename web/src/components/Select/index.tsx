import React, { useRef, useEffect } from 'react';
import ReactSelect, {
  OptionTypeBase,
  Props as SelectProps,
} from 'react-select';
import { useField } from '@unform/core';

import { Container } from './styles';

interface Props extends SelectProps<OptionTypeBase> {
  name: string;
}

const Select: React.FC<Props> = ({ name, ...rest }) => {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return [];
          }
          return ref.state.value.map((option: OptionTypeBase) => option.value);
        }
        if (!ref.state.value) {
          return '';
        }
        return ref.state.value.value;
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  return (
    <Container>
      <ReactSelect
        styles={{
          control: (provided, state) => ({
            ...provided,
            marginBottom: '0.8rem',
            border: '2px solid #ccc',
            borderRadius: '1rem',
            padding: '0.5rem',
            backgroundColor: 'none',
            fontFamily: 'inherit',
            fontSize: '1.4rem',
          }),
          option: (provided, state) => ({
            ...provided,
            padding: '1.4rem',
            fontFamily: 'inherit',
          }),
          menu: (provided, state) => ({
            ...provided,
            backgroundColor: '#ccc',
          }),
        }}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: '#036873',
            primary25: '#ddd',
          },
        })}
        defaultValue={defaultValue}
        ref={selectRef}
        classNamePrefix="react-select"
        {...rest}
      />
    </Container>
  );
};

export default Select;
