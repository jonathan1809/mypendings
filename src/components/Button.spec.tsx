import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

describe("Button component", () => {
  test("renders button with the correct label", () => {
    const label = "Click me";
    render(<Button label={label} />);
    const buttonElement = screen.getByText(label);
    expect(buttonElement).toBeInTheDocument();
  });

  test("calls onClick handler when button is clicked", () => {
    const onClickMock = jest.fn();
    render(<Button label="Click me" onClick={onClickMock} />);
    const buttonElement = screen.getByText("Click me");
    fireEvent.click(buttonElement);
    expect(onClickMock).toHaveBeenCalled();
  });
});
