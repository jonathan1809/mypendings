import React, { useMemo, useEffect, useCallback, useState } from "react";
import TaskCardDashboard from "../features/TaskCardDashboard";
import { useTaskContext } from "../context/TaskContext";
import { StatusEnum, StatusTask } from "../constants/status";
import Task from "../util/types/Task";

const DashboardContainer: React.FC = () => {
  const { tasks = [], setStatus } = useTaskContext() ?? {};
  const [activeTasks, setActiveTasks] = useState<Task[]>([]);

  const setActiveTasksSorted = (activeTasks: Task[]) => {
    setActiveTasks(activeTasks);
  };

  const doneTasks = useMemo(() => {
    return tasks.filter((task) => task.status === StatusEnum.done);
  }, [tasks]);

  const updateStatus = useCallback(
    (id: string, status: StatusTask) => {
      setStatus?.(id, status);
    },
    [setStatus]
  );

  useEffect(() => {
    setActiveTasks(tasks.filter((task) => task.status === StatusEnum.active));
  }, [tasks]);

  return (
    <TaskCardDashboard
      activeTasks={activeTasks}
      doneTasks={doneTasks}
      updateStatus={updateStatus}
      setActiveTaskSorted={setActiveTasksSorted}
    />
  );
};

export default DashboardContainer;
