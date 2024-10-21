"use client"

import { useQuery, gql } from "@apollo/client";
import { useState } from "react";
import { CSVLink } from "react-csv";

const GET_TASKS = gql`
  query {
    tasks {
      id
      title
      completed
    }
  }
`;

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

export default function Home() {
  const { loading, error, data } = useQuery(GET_TASKS);
  const [filter, setFilter] = useState("all");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const filteredTasks = data.tasks.filter((task: { id: string; title: string; completed: boolean }) => {
    if (filter === "completed") return task.completed;
    if (filter === "uncompleted") return !task.completed;
    return true;
  });

  return (
    <div>
      <h1>Todo List</h1>
      <div>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("uncompleted")}>Uncompleted</button>
      </div>
      <ul>
        {filteredTasks.map((task: Task) => (
          <li key={task.id}>
            {task.title} - {task.completed ? "Completed" : "Not Completed"}
          </li>
        ))}
      </ul>
      <CSVLink data={data.tasks} filename={"tasks.csv"}>Download CSV</CSVLink>
    </div>
  );
}
