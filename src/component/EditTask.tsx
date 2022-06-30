import { useState, useEffect, ChangeEvent } from "react";
import { db } from "../firebase";
import { updateDoc, doc } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faCancel } from "@fortawesome/free-solid-svg-icons";

type Props = {
  title: string;
  id: string;
  dismiss: () => void;
};
const EditTask = (task: Props) => {
  const [edited, setEdited] = useState(task.title);

  useEffect(() => {
    setEdited(task.title);
  }, []);

  function changeHandler(e: ChangeEvent<HTMLInputElement>) {
    setEdited(e.target.value);
  }

  async function updateTask() {
    await updateDoc(doc(db, "tasks", task.id), { title: edited });
    task.dismiss();
  }

  return (
    <div className="edit">
      <input id='updateInput' value={edited} onChange={changeHandler} />
      <div className="buttons" onClick={updateTask}>
        <button className="left">
          <FontAwesomeIcon icon={faCheckCircle} />
        </button>
        <button className="right" onClick={task.dismiss}>
          <FontAwesomeIcon icon={faCancel} />
        </button>
      </div>
    </div>
  );
};

export default EditTask;
