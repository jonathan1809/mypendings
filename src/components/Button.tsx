import styled from "styled-components";

interface ButtonProps {
  label: string;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
}

const Button = ({ label, type = "button", onClick }: ButtonProps) => (
  <StyledButton onClick={onClick} type={type}>
    {label}
  </StyledButton>
);

const StyledButton = styled.button`
  background-color: #14b211;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin: 10px;
`;

export default Button;
