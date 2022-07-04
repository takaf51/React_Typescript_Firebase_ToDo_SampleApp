import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPen } from "@fortawesome/free-solid-svg-icons";
import EditTask from "./EditTask";

interface Task {
  id: string;
  title: string;
}

const TaskItem = (task: Task) => {
  const [onEdit, setOnEdit] = useState(false);

  useEffect(() => {
    if (onEdit) {
      const input: HTMLInputElement | null  = document.querySelector("#updateInput");
      if (input)
        input.focus();
    }
    
  }, [onEdit]);

  async function deleteTask(e: React.MouseEvent<HTMLButtonElement>) {
    if (!e.currentTarget.dataset.id) return;
    const id: string = e.currentTarget.dataset.id;
    await deleteDoc(doc(db, "tasks", id));
  }

  function editTask() {
    document.getElementById(task.id)!.classList.add("move");
    setOnEdit(true);
  }

  function resetPosition(e: React.MouseEvent<HTMLElement>) {
    if (e.target === e.currentTarget)
      dismissEdit();
  }

  function dismissEdit() {
    document.getElementById(task.id)!.classList.remove("move");
    setOnEdit(false);
  }

  return (
    <div className="item" onMouseLeave={resetPosition}>
      {onEdit && <EditTask id={task.id} title={task.title} dismiss={dismissEdit} />}
      <div className="disp" id={task.id}>
        <li>{task.title}</li>
        <div className="buttons">
          <button className="left" data-id={task.id} onClick={editTask}>
            <FontAwesomeIcon icon={faPen} />
          </button>
          <button className="right" data-id={task.id} onClick={deleteTask}>
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
