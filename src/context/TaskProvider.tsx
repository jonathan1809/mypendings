import { ReactNode, useState, useEffect, useCallback, useMemo } from "react";
import { TaskContext } from "./TaskContext";
import { StatusTask } from "../constants/status";
import Task from "../util/types/Task";
import LocalStorageService from "../services/LocalStorageService";

type TasksProviderProps = {
  children: ReactNode;
};
const TaskProvider = ({ children }: TasksProviderProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { get, set } = LocalStorageService;

  const addTask = useCallback(
    (task: Task) => {
      const newTasks = [...tasks, task];
      newTasks.sort(
        (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      );
      updateTasks(newTasks);
    },
    [tasks]
  );

  const setStatus = useCallback(
    (id: string, status: StatusTask) => {
      const newTasks = [...tasks];
      const updatedTasks = newTasks.map((task) =>
        task.id === id ? { ...task, status: status } : task
      );
      updateTasks(updatedTasks);
    },
    [tasks]
  );

  const updateTasks = (updatedTasks: Task[]) => {
    setTasks(updatedTasks);
    set("tasks", updatedTasks);
  };

  useEffect(() => {
    const storedTasks = get<Task[]>("tasks");
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  const taskContext = useMemo(
    () => ({
      tasks,
      addTask,
      setStatus,
      setTasks,
    }),
    [tasks, addTask, setStatus, setTasks]
  );

  return (
    <TaskContext.Provider value={taskContext}>{children}</TaskContext.Provider>
  );
};

export default TaskProvider;
