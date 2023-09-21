import { useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import TextInput from "../components/Input";
import DateInput from "../components/DateInput";
import Form from "../components/Form";
import SelectInput from "../components/SelectInput";
import { StatusEnum, StatusTask } from "../constants/status";
import Task from "../util/types/Task";
import { useTaskContext } from "../context/TaskContext";
import Button from "../components/Button";

interface PendingFormProps {
  onSubmit: () => void;
}

const options: StatusTask[] = ["Active", "Done"];

const PendingForm: React.FC<PendingFormProps> = ({ onSubmit }) => {
  const { tasks, addTask } = useTaskContext() ?? {};
  const [priority, setPriority] = useState("");
  const [priorityError, setPriorityError] = useState("");

  const [text, setText] = useState("");
  const [textError, setTextError] = useState("");

  const [status, setStatus] = useState("");
  const [statusError, setStatusError] = useState("");

  const [dueDate, setDueDate] = useState(new Date().toISOString());
  const [dueDateError, setDueDateError] = useState("");

  const isDuplicateDescription = (description: string) => {
    return tasks?.find(
      (task: Task) =>
        task.text.toLocaleLowerCase().trim() ===
          description.toLocaleLowerCase().trim() &&
        task.status === StatusEnum.active
    );
  };

  const handleFormSubmit = () => {
    if (isDuplicateDescription(text)) {
      setTextError("A task with the same description already exists.");
      return;
    }

    if (priority.trim() === "") {
      setPriorityError("Priority is required");
    }

    if (text.trim() === "") {
      setTextError("Text is required");
    }

    if (status.trim() === "") {
      setStatusError("Status is required");
    }

    if (!dueDate) {
      setDueDateError("Due date is required");
    }

    if (
      priority.trim() !== "" &&
      text.trim() !== "" &&
      status.trim() !== "" &&
      dueDate
    ) {
      const task: Task = {
        id: uuidv4(),
        priority: priority.trim(),
        text: text.trim(),
        status: status as StatusTask,
        dueDate: dueDate,
      };
      addTask?.(task);
      onSubmit();
    }
  };

  return (
    <$FormContainer>
      <$FormTitle>Add Pending task</$FormTitle>
      <Form onSubmit={handleFormSubmit}>
        <$FormElementsContainer>
          <TextInput
            value={priority}
            onChange={setPriority}
            required={true}
            error={priorityError}
            label={"Priority"}
            name={"priority"}
          />
          <TextInput
            value={text}
            onChange={setText}
            required={true}
            error={textError}
            name={"text"}
            label={"Description"}
          />
          <SelectInput
            name="status"
            value={status}
            onChange={setStatus}
            placeholder="Status"
            label="Select status"
            required={true}
            error={statusError}
            options={options}
          />
          <DateInput
            value={dueDate}
            onChange={setDueDate}
            placeholder="Due Date"
            required={true}
            error={dueDateError}
            name={"dueDate"}
            label={"Due Date"}
          />

          <Button type="submit" label="Add" />
        </$FormElementsContainer>
      </Form>
    </$FormContainer>
  );
};

const $FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 500px;
`;

const $FormTitle = styled.h1`
  color: #333;
  margin-bottom: 16px;
`;

const $FormElementsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`;

export default PendingForm;
