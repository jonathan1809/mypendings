import styled from "styled-components";

interface TextInputProps {
  name: string;
  value: string;
  placeholder?: string;
  label: string;
  required?: boolean;
  error?: string;
  onChange: (value: string) => void;
}

const TextInput = ({
  name,
  value,
  placeholder,
  label,
  required,
  error,
  onChange,
}: TextInputProps) => (
  <$Root>
    {label && <label htmlFor={name}>{label}</label>}
    <$Input
      type="text"
      id={name}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
    />
    {error && <$Error>{error}</$Error>}
  </$Root>
);

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

const $Input = styled.input`
  border: 1px solid #ccc;
  padding: 8px;
  border-radius: 4px;
  width: 100%;
`;

const $Error = styled.span`
  color: red;
`;

export default TextInput;
