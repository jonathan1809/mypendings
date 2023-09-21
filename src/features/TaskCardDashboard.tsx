import { useState, useCallback } from "react";
import styled from "styled-components";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Task from "../util/types/Task";
import Card from "../components/Card";
import { Modal } from "../components/Modal";
import { replaceObject } from "../util/array";
import { StatusEnum, StatusTask } from "../constants/status";
import TaskForm from "./AddTaskForm";
import Button from "../components/Button";

type TaskCardDashboardProps = {
  activeTasks: Task[];
  doneTasks: Task[];
  updateStatus: (id: string, status: StatusTask) => void;
  setActiveTaskSorted: (activeTasks: Task[]) => void;
};
const TaskCardDashboard = ({
  activeTasks,
  updateStatus,
  doneTasks,
  setActiveTaskSorted,
}: TaskCardDashboardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onCloseTask = () => {
    setIsModalOpen(false);
  };

  const onAddTask = () => {
    setIsModalOpen(false);
  };

  const onChangeToDone = useCallback(
    (id: string) => {
      updateStatus(id, StatusEnum.done);
    },
    [updateStatus]
  );

  const onChangeToDelete = useCallback(
    (id: string) => {
      updateStatus(id, StatusEnum.deleted);
    },
    [updateStatus]
  );

  const sortByDueDate = useCallback(() => {
    setActiveTaskSorted(
      [...activeTasks].sort(
        (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      )
    );
  }, [activeTasks, setActiveTaskSorted]);

  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const updatedTasksIndexes = replaceObject(
        [...activeTasks],
        dragIndex,
        hoverIndex
      );
      setActiveTaskSorted(updatedTasksIndexes);
    },
    [activeTasks, setActiveTaskSorted]
  );

  const renderCards = useCallback(
    () =>
      activeTasks.map((task: Task, index: number) => (
        <Card
          key={task.id}
          index={index}
          moveCard={moveCard}
          task={task}
          markAsDone={onChangeToDone}
          markAsDeleted={onChangeToDelete}
        />
      )),
    [moveCard, onChangeToDelete, onChangeToDone, activeTasks]
  );

  return (
    <$DashboardContainer>
      <$DashboardActions>
        <Button
          label="Sort by Due Date"
          onClick={sortByDueDate}
          type="button"
        />
      </$DashboardActions>
      <DndProvider backend={HTML5Backend}>
        <$DashboardCanvas>
          <$DefaultCardOpenForm onClick={() => setIsModalOpen(true)}>
            <$DiagonalLine />
            <$DiagonalLine style={{ transform: "rotate(-40deg)" }} />
          </$DefaultCardOpenForm>
          {renderCards()}
        </$DashboardCanvas>
      </DndProvider>
      <CountersSection>
        <ActiveCount>Active {activeTasks.length}</ActiveCount>
        <DoneCount>Done {doneTasks.length}</DoneCount>
      </CountersSection>
      {isModalOpen && (
        <Modal onClose={onCloseTask}>
          <TaskForm onSubmit={onAddTask} />
        </Modal>
      )}
    </$DashboardContainer>
  );
};

const $DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const $DashboardActions = styled.div`
  display: flex;
  align-items: start;
  margin: 40px 0px;
`;

const $DashboardCanvas = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-height: 800px;
  max-height: 1000px;
  max-width: 1400px;
  width: 1300px;
  overflow-y: scroll;
  border: solid 1px #000;
  background-color: white;
  padding: 30px;
`;

const $DefaultCardOpenForm = styled.div`
  width: 200px;
  height: 300px;
  background-color: #f5f5f5;
  border: 2px solid black;
  position: relative;
`;

const $DiagonalLine = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 2px;
  height: 100%;
  background-color: black;
  transform: rotate(40deg); /* Rotate the line by 45 degrees */
`;

const CountersSection = styled.div`
  height: 30%;
  display: flex;
  align-items: start;
  margin-top: 20px;
`;

const ActiveCount = styled.span`
  color: green;
`;

const DoneCount = styled.span`
  color: blue;
  margin-left: 25%;
`;

export default TaskCardDashboard;
