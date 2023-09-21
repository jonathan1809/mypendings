import { render, fireEvent } from "@testing-library/react";
import SelectInput from "./SelectInput";

describe("SelectInput", () => {
  it("should call onChange with selected value", () => {
    const onChange = jest.fn();

    const options = ["Option 1", "Option 2", "Option 3"];

    const { getByLabelText } = render(
      <SelectInput
        name="test-select"
        label="Test Select"
        value=""
        error=""
        placeholder="Please select an option"
        required={true}
        options={options}
        onChange={onChange}
      />
    );

    const selectInput = getByLabelText("Test Select") as HTMLSelectElement;

    // Simulate selecting an option
    fireEvent.change(selectInput, { target: { value: "Option 2" } });

    // Assert that onChange is called with the selected value
    expect(onChange).toHaveBeenCalledWith("Option 2");
  });
});
