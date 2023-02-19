import React from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import Task from "./Task";

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 220px;

  display: flex;
  flex-direction: column;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${(props) => (props.isDraggingOver ? "skyblue" : "white")};

  flex-grow: 1;
  min-width: 100px;
`;

const Column = (props) => {
  return (
    <Container>
      <Title>{props.column.title}</Title>
      {/* droppableId - This id needs to be unique within DragDropContexr */}
      {/* Droppable child to be a function. That return a react component  */}
      <Droppable
        droppableId={props.column.id}
        //1. We can handle draggable is droppable or not. "column-3" has type done. first two column have type active. we can not move task to "column-3"
        type={props.column.id === "column-3" ? "done" : "active"}
        // 2. We can handle draggable is droppable or not. if isDropDisable is true then we can not add draggable into this droppable. Ex :- we can enforce the task to move to the right of where they started.
        isDropDisabled={props.isDropDisabled}
      >
        {(provided, snapshot) => (
          <TaskList
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {props.tasks.map((task, index) => (
              <Task key={task.id} task={task} index={index} />
            ))}
            {/* placeholder is a react element that is used to increase the availabel space in a droppable during a drag when it's needed. The placeholder needs to be added as a child of the component that you designate as the droppable. */}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </Container>
  );
};

export default Column;
