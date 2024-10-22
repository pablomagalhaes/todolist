// pages/page.tsx
"use client";

import React from "react";
import { Header } from "./components/Header/Header";
import { Main } from "./components/Main/Main";
import { useToDo } from "../hooks/useToDo";

export default function Home() {
  const { todos, loading, error } = useToDo();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <Header />
      <Main />
      {/* <div>
        <h2>Tasks</h2>
        <ul>
          {todos.map(todo => (
            <li key={todo.id}>
              {todo.title} - {todo.completed ? "Completed" : "Not Completed"}
            </li>
          ))}
        </ul>
      </div> */}
    </div>
  );
}
