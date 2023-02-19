import { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import styled from "styled-components";

import Column from "./Column";
import initialData from "./initial-data";

const Container = styled.div`
  display: flex;
`;

function App() {
  const [data, setData] = useState(initialData);
  const [index, setIndex] = useState(null);

  function onDragStart(start) {
    const homeIndex = data.columnOrder.indexOf(start.source.droppableId);
    setIndex(homeIndex);
  }

  function onDragEnd(result) {
    setIndex(null);
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // 1. If there is only one column and move task to same column
    // const column = data.columns[source.droppableId];
    // const newTaskIds = Array.from(column.taskIds);
    // newTaskIds.splice(source.index, 1);
    // newTaskIds.splice(destination.index, 0, draggableId);
    // const newColumn = {
    //   ...column,
    //   taskIds: newTaskIds,
    // };
    // const newstate = {
    //   ...data,
    //   columns: {
    //     ...data.columns,
    //     [newColumn.id]: newColumn,
    //   },
    // };
    // setData(newstate);

    // 2. If there are multiple column and move task beetween columns
    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];
    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };
      const newstate = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      };
      setData(newstate);
      return;
    }
    // Moving from one list to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };
    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };
    const newState = {
      ...data,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    setData(newState);
  }

  return (
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <Container>
        {data.columnOrder.map((columnId, i) => {
          const column = data.columns[columnId];
          const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

          const isDropDisabled = i < index;

          return (
            <Column
              key={column.id}
              column={column}
              tasks={tasks}
              isDropDisabled={isDropDisabled}
            />
          );
        })}
      </Container>
    </DragDropContext>
  );
}

export default App;
