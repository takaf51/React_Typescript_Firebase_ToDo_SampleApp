import "./App.css";
import React, { useState, useEffect } from 'react'
import { db,} from './firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import TaskList from "./component/TaskItem";
import AddTask from "./component/AddTask";


function App() {
  const [tasks, setTasks] = useState<{ id: string, title: string }[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'tasks'), orderBy('createDateTime', 'asc'));
    const unsub = onSnapshot(q, (collection) => {
      let data = collection.docs.map(doc => {
        const id: string = doc.id;
        const title: string = doc.data().title;
        return { id, title };
      });
      setTasks(data);
    })
    return () => unsub();
  }, []);

  return (
    <section>
      <div className="box">
        <h3>To Do List</h3>
        <AddTask/>
        <ul>
          {tasks.map((task) => (
            <TaskList key={task.id} id={task.id} title={task.title} />
          ))}
        </ul>
      </div>
    </section>
  );
}

export default App
