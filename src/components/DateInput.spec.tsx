import { render, screen, fireEvent } from "@testing-library/react";
import DateInput from "./DateInput";

describe("DateInput", () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    render(
      <DateInput
        name="date"
        value=""
        label="Select a date"
        onChange={mockOnChange}
        placeholder="date"
      />
    );
  });

  it("should render the label passed as a prop", () => {
    expect(screen.getByLabelText("Select a date")).toBeInTheDocument();
  });

  it("should call onChange handler when input value changes", () => {
    const inputElement = screen.getByPlaceholderText("date");
    fireEvent.change(inputElement, { target: { value: "2022-01-01" } });

    expect(mockOnChange).toHaveBeenCalledWith("2022-01-01");
  });
});
