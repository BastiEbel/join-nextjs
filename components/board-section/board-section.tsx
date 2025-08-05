"use client";
import { useRef, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import Image from "next/image";

import styles from "./boardsection.module.css";

import { TaskData } from "@/types/type-data";
import { priorityItems } from "@/constants/priority-items";

import TaskForm from "../task-form/task-form";
import OpenModal, { ModalHandle } from "@/ui/OpenModal";
import TaskCard from "./task-card";

type StatusType = "To Do" | "In Progress" | "Await Feedback" | "Done";
interface Task {
  id: string;
  status: StatusType;
  addTask: TaskData[];
}

export default function BoardSection() {
  const dialogRef = useRef<ModalHandle>(null);

  const [tasksStatus, setTasksStatus] = useState<Record<StatusType, Task[]>>({
    "To Do": [],
    "In Progress": [],
    "Await Feedback": [],
    Done: [],
  });

  function onOpenTaskHandler() {
    if (dialogRef.current) {
      dialogRef.current.open();
    }
  }

  function onCloseTaskHandler() {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  }

  async function onDragEnd(result: DropResult) {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceStatus = source.droppableId as StatusType;
    const destStatus = destination.droppableId as StatusType;

    const sourceList = Array.from(tasksStatus[sourceStatus]);
    const [removed] = sourceList.splice(source.index, 1);
    const destList = Array.from(tasksStatus[destStatus]);
    if (removed) {
      removed.status = destStatus;
      destList.splice(destination.index, 0, removed);

      /* try {
        await updateTaskStatus(removed.id, destStatus);
      } catch (e) {
        console.error("Fehler beim Status-Update:", e);
      } */
    }

    setTasksStatus({
      ...tasksStatus,
      [sourceStatus]: sourceList,
      [destStatus]: destList,
    });
  }

  return (
    <>
      <OpenModal ref={dialogRef}>
        <TaskForm onClose={onCloseTaskHandler} />
      </OpenModal>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className={styles["board-section"]}>
          {priorityItems.map((prioItem) => (
            <Droppable droppableId={prioItem.priority} key={prioItem.priority}>
              {(provided) => (
                <div
                  className={styles["prioTask"]}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <div className={styles["board-priority"]}>
                    <label>{prioItem.priority}</label>
                    {prioItem.image !== "" && (
                      <Image
                        src={prioItem.image}
                        alt="Plus"
                        width={24}
                        height={24}
                        onClick={onOpenTaskHandler}
                      />
                    )}
                  </div>
                  <div className={styles["board-task"]}>
                    {(tasksStatus[prioItem.priority as StatusType] ?? []).map(
                      (task: Task, idx: number) => (
                        <Draggable
                          draggableId={task.id}
                          index={idx}
                          key={task.id}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <TaskCard addTask={task.addTask[0]} />
                            </div>
                          )}
                        </Draggable>
                      )
                    )}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </>
  );
}
