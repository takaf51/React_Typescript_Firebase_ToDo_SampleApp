import "./App.css";
import React, { useState, useEffect, useContext } from "react";
import { db } from "./firebase";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import TaskList from "./component/TaskItem";
import AddTask from "./component/AddTask";
import { auth } from "./firebase";
import {AuthContext} from "./hooks/auth";

function App() {
  const [tasks, setTasks] = useState<{ id: string; title: string }[]>([]);
  const { setIsLogin } = useContext(AuthContext);

  useEffect(() => {
    if (!auth.currentUser) return;
    const q = query(
      collection(db, "tasks"),
      where("uid", "==", auth.currentUser?.uid),
      orderBy("createDateTime", "asc")
    );
    const unsub = onSnapshot(q, (collection) => {
      let data = collection.docs.map((doc) => {
        const id: string = doc.id;
        const title: string = doc.data().title;
        return { id, title };
      });
      setTasks(data);
    });
    return () => unsub();
  }, []);

  const logoutHandler = () => {
    auth.signOut();
    setIsLogin(false);
  }

  return (
    <section>
      <div className="box">
        <h3>To Do List</h3>
        <button onClick={logoutHandler}>logout</button>
        <AddTask />
        <ul>
          {tasks.map((task) => (
            <TaskList key={task.id} id={task.id} title={task.title} />
          ))}
        </ul>
      </div>
    </section>
  );
}

export default App;
