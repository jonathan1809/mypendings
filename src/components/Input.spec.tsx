import { render, screen, fireEvent } from "@testing-library/react";
import TextInput from "./Input";

describe("TextInput", () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    render(
      <TextInput
        name="testInput"
        value=""
        label="Test Input"
        onChange={mockOnChange}
      />
    );
  });

  it("should render the label correctly", () => {
    const labelElement = screen.getByText("Test Input");

    expect(labelElement).toBeInTheDocument();
  });

  it("should call onChange handler when input value changes", () => {
    const inputElement = screen.getByRole("textbox");
    fireEvent.change(inputElement, { target: { value: "New value" } });

    expect(mockOnChange).toHaveBeenCalledWith("New value");
  });
});
