import style from "./Style.module.css";
import { useState } from "react";
import { createPortal } from "react-dom";
import TaskView from "./TaskView";

const Task = ({ task }) => {
  const modalEle = document.getElementById("modal");
  const [showModal, setShowModal] = useState(false);

  // Return JSX containing the task information and a clickable container
  // that toggles the visibility of the TaskView modal when clicked
  return (
    <>
      <div onClick={() => setShowModal(true)} className={style.taskContainer}>
        <span className={style.titleContainer}>{task.title}</span>
        <span className={style.statusContainer}>{task.status}</span>
      </div>

      {/* Conditionally render the TaskView modal when showModal is true */}
      {showModal &&
        createPortal(
          <TaskView
            task={task}
            onClose={() => {
              setShowModal(false);
            }}
          />,
          modalEle
        )}
    </>
  );
};

export default Task;
