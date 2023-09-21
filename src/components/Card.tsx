import React from "react";
import styled from "styled-components";
import { useDrag, useDrop } from "react-dnd";
import Task from "../util/types/Task";
import { isDueTodayOrTomorrow } from "../util/validations";
import { ItemTypes } from "../constants/ItemTypes";
import { useRef } from "react";
import { StatusEnum } from "../constants/status";

export interface CardProps {
  task: Task;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  markAsDone: (id: string) => void;
  markAsDeleted: (id: string) => void;
}

const statusLabel = {
  [StatusEnum.active]: "Pending",
  [StatusEnum.done]: "Done",
  [StatusEnum.deleted]: "Delete",
};

type ItemDnD = {
  id: string;
  index: number;
};
const Card: React.FC<CardProps> = ({
  task,
  index,
  markAsDone,
  moveCard,
  markAsDeleted,
}) => {
  const { id, priority, text, status, dueDate } = task;

  const ref = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.task,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = (item as ItemDnD).index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = (clientOffset?.y ?? 0) - hoverBoundingRect.top;
      // Get height of the element
      const elementHeight = hoverBoundingRect.bottom - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed a certain threshold
      // When dragging downwards, only move when the cursor is below the threshold
      // When dragging upwards, only move when the cursor is above the threshold
      // Dragging downwards
      if (
        dragIndex < hoverIndex &&
        hoverClientY < hoverMiddleY - elementHeight / 4
      ) {
        return;
      }
      // Dragging upwards
      if (
        dragIndex > hoverIndex &&
        hoverClientY > hoverMiddleY + elementHeight / 4
      ) {
        return;
      }
      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      (item as ItemDnD).index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.task,
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleMarkAsDone = () => {
    markAsDone(id);
  };

  const handleDelete = () => {
    markAsDeleted(id);
  };
  drag(drop(ref));

  return (
    <$CardContainer
      ref={ref}
      data-handler-id={handlerId}
      $isDragging={isDragging}
      $dueDate={dueDate}
    >
      <$Text>
        {" "}
        <$Bold>Priority:</$Bold> {priority}
      </$Text>
      <$Text>
        <$Bold>Description:</$Bold> {text}
      </$Text>
      <$Text>
        <$Bold>Status:</$Bold>
        {statusLabel[status]}
      </$Text>
      <$Text>
        <$Bold>Due Date:</$Bold>
        {dueDate}
      </$Text>
      <$ButtonWrapper>
        <$Button onClick={handleMarkAsDone}>
          <$CheckmarkIcon role="img" aria-label="Checkmark">
            ✅
          </$CheckmarkIcon>
          Mark as Done
        </$Button>
        <$Button onClick={handleDelete}>
          <$TrashIcon role="img" aria-label="Trash">
            🗑️
          </$TrashIcon>
          Delete
        </$Button>
      </$ButtonWrapper>
    </$CardContainer>
  );
};

type $CardContainerProps = {
  $isDragging: boolean;
  $dueDate: string;
};
const $CardContainer = styled.div<$CardContainerProps>`
  opacity: ${(props) => (props.$isDragging ? 0.5 : 1)};
  cursor: move;
  background-color: ${(props) =>
    isDueTodayOrTomorrow(props.$dueDate) ? "#FFD6D6" : "#FFFFFF"};
  display: flex;
  padding: 16px;
  justify-content: start;
  border-radius: 8px;
  margin-bottom: 16px;
  width: 200px;
  height: 300px;
  flex-direction: column;
  align-items: start;
  text-align: start;
  margin: 0 10px;
  border: solid 1px #000;
  -webkit-box-shadow: 10px 10px 5px -6px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 10px 10px 5px -6px rgba(0, 0, 0, 0.75);
  box-shadow: 10px 10px 5px -6px rgba(0, 0, 0, 0.75);
`;

const $Text = styled.p``;

const $Bold = styled.span`
  font-weight: bold;
`;

const $ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 8px;
`;

const $Button = styled.button`
  background-color: transparent;
  border: none;
  padding: 0;
  margin-right: 8px;
  cursor: pointer;
`;

const $CheckmarkIcon = styled.span`
  display: inline-block;
  margin-right: 4px;
`;

const $TrashIcon = styled.span`
  display: inline-block;
  margin-right: 4px;
`;
export default Card;
