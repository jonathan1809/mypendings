import styled from "styled-components";

interface DateInputProps {
  name: string;
  value: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  onChange: (value: string) => void;
}

const DateInput = ({
  name,
  value,
  label,
  placeholder,
  required,
  error,
  onChange,
}: DateInputProps) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateFormatted = new Date(e.target.value).toISOString().split("T")[0];
    onChange(dateFormatted);
  };

  return (
    <$Root>
      {label && <label htmlFor={name}>{label}</label>}
      <$DatePicker
        type="date"
        id={name}
        value={value}
        onChange={handleOnChange}
        placeholder={placeholder}
        required={required}
      />
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

const $DatePicker = styled.input`
  border: 1px solid #ccc;
  padding: 8px;
  border-radius: 4px;
  width: 100%;
`;

const $Error = styled.span`
  color: red;
`;

export default DateInput;
