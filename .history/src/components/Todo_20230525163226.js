import React, { useState, useEffect } from "react";
import "../App.css";
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";

const Todo = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [loadingPost, setIsLoadingPost] = useState(false);

  const addTodo = async (e) => {
    // prevent a browser reload/refresh
    e.preventDefault();
    setIsLoadingPost(true);
    try {
      var d = new Date(Date.now());
      console.log("date:", d.toString());
      const docRef = await addDoc(collection(db, "todos"), {
        todo: todo,
        date: d,
      });
      console.log("Document written with ID: ", docRef.id);
      setIsLoadingPost(false);
    } catch (e) {
      console.error("Error adding document: ", e);
      setIsLoadingPost(false);
    }
  };

  const removeTodo = async (e, todo) => {
    e.preventDefault();
    console.log("deleting", todo.key);
    try {
      await deleteDoc(doc(db, "todos", todo.key));
      console.log("Deleted?");
      setIsLoadingPost(false);
    } catch (error) {
      console.error("Error removing document: ", e);
    }
    console.log("clicked delete");
  };

  useEffect(() => {
    let unsubscribe;
    try {
      const q = query(collection(db, "todos"));
      unsubscribe = onSnapshot(q, (querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          key: doc.id,
        }));
        setTodos(newData);
        console.log("Todos: ", newData.join(", "));
      });
    } catch (error) {
      console.log(error);
    }
    return () => unsubscribe();
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
            <button
              type="submit"
              className="btn"
              onClick={addTodo}
              disabled={loadingPost}
            >
              Submit
            </button>
          </div>
        </div>

        <div className="todo-content">
          {todos?.map((todo, i) => (
            <div>
              <h2 key={i}>{todo.todo}</h2>
              <h3>{todo.date.toDate().toString()}</h3>

              <button onClick={(e) => removeTodo(e, todo)}>delete</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Todo;