import { render, fireEvent, waitFor } from "@testing-library/react";
import PendingForm from "./AddTaskForm";
import TaskProvider from "../context/TaskProvider";

describe("PendingForm", () => {
  it("should call onSubmit when form is submitted with valid data", () => {
    const onSubmit = jest.fn();

    const { getByLabelText, getByText, getByTestId } = render(
      <TaskProvider>
        <PendingForm onSubmit={onSubmit} />
      </TaskProvider>
    );

    fireEvent.change(getByLabelText("Priority"), { target: { value: "High" } });
    fireEvent.change(getByLabelText("Description"), {
      target: { value: "Complete task" },
    });
    fireEvent.change(getByTestId("select-input"), {
      target: { value: "Active" },
    });
    fireEvent.change(getByLabelText("Due Date"), {
      target: { value: "2022-01-01" },
    });

    fireEvent.click(getByText("Add"));

    expect(onSubmit).toHaveBeenCalled();
  });

  it("should display error messages when form is submitted with invalid Status", async () => {
    const onSubmit = jest.fn();

    const { getByLabelText, getByText, queryByText } = render(
      <TaskProvider>
        <PendingForm onSubmit={onSubmit} />
      </TaskProvider>
    );

    // Set values for form fields
    fireEvent.change(getByLabelText("Priority"), { target: { value: "High" } });
    fireEvent.change(getByLabelText("Description"), {
      target: { value: "Complete task 1" },
    });
    fireEvent.change(getByLabelText("Due Date"), {
      target: { value: "2022-01-01" },
    });
    fireEvent.click(getByText("Add"));
    await waitFor(() =>
      expect(queryByText("Status is required")).toBeInTheDocument()
    );
  });
});
