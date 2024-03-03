import React, { useRef } from "react";
import style from "./Style.module.css";
import "react-dropdown/style.css";
import { Divider } from "@react-md/divider";
import Modal from "./Modal";

import { useDispatch, useSelector } from "react-redux";
import { taskActions } from "../redux/TaskSlice";

import { NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";

function TaskView({ task, onClose }) {
  const dispatch = useDispatch();
  const taskList = useSelector((state) => state.task.taskList);
  const statusRef = useRef("");

  //Updates task in redux store after successful deletion of task
  const updateTasksInStore = () => {
    const updatedTasks = taskList.filter((t) => {
      return t.taskID !== task.taskID;
    });
    dispatch(taskActions.refreshTask(updatedTasks));
  };

  const onDeleteHandler = () => {
    (async function deleteTask() {
      try {
        const response = await fetch(
          `http://localhost:5000/deleteTask/${task.taskID}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(task.id),
          }
        );
        if (response.status === 200) {
          updateTasksInStore();
          NotificationManager.success("Task Deleted", "Success", 1000);
        } else {
          NotificationManager.error("Deletion Failed", "Error", 1000);
        }
      } catch (e) {
        console.error(e.message);
      }
      onClose();
    })();
  };

  async function updateStatus() {
    try {
      const response = await fetch(
        `http://localhost:5000/updateTask/${task.taskID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: statusRef.current.value }),
        }
      );
      console.log(response);

      if (response.status === 200) {
        dispatch(
          taskActions.updateTask({ ...task, status: statusRef.current.value })
        );
        NotificationManager.success("Task Updated", "Success", 1000);
      } else {
        NotificationManager.error("Task Updation Failed", "Error", 1000);
      }
    } catch (e) {
      console.error(e.message);
    }
    onClose();
  }
  const onSaveHandler = (e) => {
    if (task.status !== statusRef.current.value) {
      updateStatus();
    }
  };
  return (
    <Modal>
      <div className={style.taskViewContainer}>
        <div className={style.taskViewDescriptionContainer}>
          <div className={style.taskViewtitleContainer}>{task.title}</div>
          <div className={style.taskViewTaskDescription}>
            {task.description}
          </div>
          <div>
            <button
              onClick={onSaveHandler}
              className={style.taskViewSaveButton}
            >
              Save
            </button>
            <button
              onClick={onDeleteHandler}
              className={style.taskViewSaveButton}
            >
              Delete
            </button>
          </div>
        </div>
        <Divider className={style.taskViewDivider} />
        <div className={style.taskViewDetailsOuterContainer}>
          <div className={style.taskViewDetailsContainer}>
            <div className={style.taskViewStatusContainer}>
              <div className={style.taskViewDetailsTitle}>Status</div>
              <select
                ref={statusRef}
                className={style.taskViewStatusDropdownContainer}
              >
                <option value="To Be Started">To Be Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div>
              <div className={style.taskViewDetailsTitle}>Due Date</div>
              <div className={style.backgroundbasecolor}>{task.dueDate}</div>
            </div>
            <div>
              <div className={style.taskViewDetailsTitle}>Priotrity</div>
              <div className={style.backgroundbasecolor}>{task.priority}</div>
            </div>
          </div>
          <div className={style.taskViewDetailsButtonContainer}>
            <button className={style.taskViewCloseButton} onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
export default TaskView;
