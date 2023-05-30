import React, { useState, useEffect } from "react";
import "../App.css";
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase";

const Todo = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  const addTodo = async (e) => {
    // prevent a browser reload/refresh
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "todos"), {
        todo: todo,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newTodos = [];
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTodos(newData);
      console.log("Todos: ", newTodos.join(", "));
    });
    // getDocs(collection(db, "todos")).then((querySnapshot) => {
    //   const newData = querySnapshot.docs.map((doc) => ({
    //     ...doc.data(),
    //     id: doc.id,
    //   }));
    //   setTodos(newData);
    //   console.log(todos, newData);
    // });
    // } catch {}
    // return () => unsubscribe();
  }, []);

  return (
    <section className="todo-container">
      <div className="todo">
        <h1 className="header">Todo-App</h1>

        <div>
          <div>
            <input
              type="text"
              placeholder="What do you have to do today?"
              onChange={(e) => setTodo(e.target.value)}
            />
          </div>

          <div className="btn-container">
            <button type="submit" className="btn" onClick={addTodo}>
              Submit
            </button>
          </div>
        </div>

        <div className="todo-content">
          {todos?.map((todo, i) => (
            <p key={i}>{todo.todo}</p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Todo;
