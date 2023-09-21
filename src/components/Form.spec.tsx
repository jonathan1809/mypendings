import { render, screen, fireEvent } from "@testing-library/react";
import Form from "./Form";

describe("Form", () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    render(<Form onSubmit={mockOnSubmit}>Test Form</Form>);
  });

  it("should call onSubmit handler when form is submitted", () => {
    const formElement = screen.getByRole("form");
    fireEvent.submit(formElement);

    expect(mockOnSubmit).toHaveBeenCalled();
  });
});
