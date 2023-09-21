import React, { ReactNode } from "react";

interface FormProps {
  onSubmit: () => void;
  children: ReactNode;
}

const Form = ({ onSubmit, children }: FormProps) => {
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form role="form" onSubmit={handleFormSubmit}>
      {children}
    </form>
  );
};

export default Form;
