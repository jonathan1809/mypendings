import { useContext, createContext } from "react";
import Task from "../util/types/Task";
import { StatusTask } from "../constants/status";

export interface TaskContextProps {
  tasks: Task[];
  addTask: (task: Task) => void;
  setStatus: (id: string, status: StatusTask) => void;
  setTasks: (tasks: Task[]) => void;
}

export const TaskContext = createContext<TaskContextProps | null>(null);

export function useTaskContext() {
  return useContext(TaskContext);
}
