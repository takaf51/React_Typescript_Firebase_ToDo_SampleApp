import React, { useState } from 'react';
import { auth, db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { FormControl, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faCirclePlus } from "@fortawesome/free-solid-svg-icons";

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "80%",
    marginLeft: "25px",
    color: "white",
  },
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "white !important",
  },
  input: {
    color: "white",
    fontSize: "1.2em",
  },
}));

const AddTask = () => {
  const classes = useStyles();
  const [input, setInput] = useState<string>("");

  async function newTask(e: React.MouseEvent<HTMLButtonElement>) {
    if (!input || input.trim().length === 0) return;
    await addDoc(collection(db, "tasks"), {
      title: input,
      createDateTime: new Date(),
    });
    setInput("");
  }

  return (
    <div className="input">
      <FormControl className={classes.formControl}>
        <TextField
          InputLabelProps={{
            shrink: true,
            style: {
              color: "white",
              fontSize: 20,
            },
          }}
          InputProps={{
            classes: {
              notchedOutline: classes.notchedOutline,
            },
            className: classes.input,
          }}
          fullWidth
          variant="outlined"
          label="New Task"
          value={input}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInput(e.target.value)
          }
        />
      </FormControl>
      <button className="add" disabled={!input} onClick={newTask}>
        <FontAwesomeIcon icon={faCirclePlus} />
      </button>
    </div>
  );
}

export default AddTask;