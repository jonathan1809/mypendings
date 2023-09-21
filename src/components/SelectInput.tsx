import React, { ChangeEvent } from "react";
import styled from "styled-components";

interface SelectProps {
  name: string;
  label: string;
  value: string;
  error?: string;
  placeholder?: string;
  required: boolean;
  options: string[];
  onChange: (value: string) => void;
}

const SelectInput: React.FC<SelectProps> = ({
  name,
  value,
  options,
  label,
  error,
  placeholder,
  required,
  onChange,
}) => {
  const defaultValue = !value ? placeholder : value;
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  return (
    <$Root data-testid="root-select-input">
      {label && <label htmlFor={name}>{label}</label>}
      <$SelectContainer
        id={name}
        value={defaultValue}
        onChange={handleChange}
        required={required}
        data-testid="select-input"
      >
        <option value={placeholder} disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </$SelectContainer>
      {error && <$Error>{error}</$Error>}
    </$Root>
  );
};

const $Root = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  outline: none;
  z-index: 9999;
  margin: 10px;
  align-items: start;
  width: 100%;
  label {
    font-size: 14px;
    line-height: 20px;
    font-weight: 600;
    margin-bottom: 4px;
  }
`;

const $SelectContainer = styled.select`
  border: 1px solid #ccc;
  padding: 8px;
  border-radius: 4px;
  width: 100%;
`;

const $Error = styled.span`
  color: red;
  font-size: 1rem;
`;

export default SelectInput;
