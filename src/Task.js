import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${(props) =>
    props.isDragDisabled
      ? "lightgrey"
      : props.isDragging
      ? "lightgreen"
      : "white"};
`;

const Task = (props) => {
  const isDragDisabled = props.task.id === "task-1";
  return (
    // Draggable expect child is a function
    <Draggable
      draggableId={props.task.id}
      index={props.index}
      // We can disable some task to draggable
      isDragDisabled={isDragDisabled}
    >
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          isDragDisabled={isDragDisabled}
        >
          {props.task.content}
        </Container>
      )}
    </Draggable>
  );
};

export default Task;
