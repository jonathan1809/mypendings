import { act, render, renderHook } from "@testing-library/react";
import TaskProvider from "./TaskProvider";
import { useContext } from "react";
import { TaskContext } from "./TaskContext";
import { StatusEnum } from "../constants/status";

describe("TaskProvider", () => {
  it("renders children", () => {
    const { getByText } = render(
      <TaskProvider>
        <div>Child Component</div>
      </TaskProvider>
    );

    expect(getByText("Child Component")).toBeInTheDocument();
  });

  it("adds a task", () => {
    const { result } = renderHook(() => useContext(TaskContext), {
      wrapper: TaskProvider,
    });

    act(() => {
      result?.current?.addTask({
        id: "1",
        dueDate: new Date().toISOString(),
        status: StatusEnum.active,
        text: "Task 1",
        priority: "High",
      });
    });

    expect(result?.current?.tasks).toHaveLength(1);
    expect(result?.current?.tasks[0].id).toEqual("1");
  });

  it("sets task status", () => {
    const { result } = renderHook(() => useContext(TaskContext), {
      wrapper: TaskProvider,
    });

    const taskId = "1";
    const newStatus = StatusEnum.active;

    act(() => {
      result?.current?.setStatus(taskId, newStatus);
    });

    const updatedTask = result?.current?.tasks.find(
      (task) => task.id === taskId
    );

    expect(updatedTask?.status).toEqual(newStatus);
  });
});
