"use client"; // Garantindo que seja um componente cliente

import React, { createContext, ReactNode, useMemo, useCallback } from 'react';
import { useQuery, useMutation, gql, ApolloError } from '@apollo/client'; // Import ApolloError

type TaskType = {
  id: string;
  title: string;
  completed: boolean;
  date_created: string;
};

export interface IToDoContextData {
  todos: TaskType[];
  totalTodos: number;
  totalDoneTodos: number;
  isEmpty: boolean;
  loading: boolean;
  error: ApolloError | null; // Ajuste aqui para aceitar ApolloError
  addTodo: (title: string) => void;
  toggleTodo: (id: string, completed: boolean) => void;
  removeTodo: (id: string) => void;
}

interface IToDoProviderProps {
  children: ReactNode;
}

export const TodoContext = createContext<IToDoContextData | undefined>(undefined);

// GraphQL Queries e Mutations
const GET_TASKS = gql`
  query GetTasks {
    tasks {
      id
      title
      completed
      date_created
    }
  }
`;

const ADD_TASK = gql`
  mutation AddTask($title: String!) {
    addTask(title: $title) {
      id
      title
    }
  }
`;

const UPDATE_TASK = gql`
  mutation UpdateTask($id: Int!, $completed: Boolean!) {
    updateTask(id: $id, completed: $completed) {
      id
      title
      completed
    }
  }
`;

const DELETE_TASK = gql`
  mutation DeleteTask($id: Int!) {
    deleteTask(id: $id)
  }
`;

export function ToDoProvider({ children }: IToDoProviderProps) {
  // Apollo Client para query de tasks
  const { loading, error: queryError, data, refetch } = useQuery(GET_TASKS);

  // Apollo Client Mutations para adicionar, atualizar e deletar tarefas
  const [addTaskMutation] = useMutation(ADD_TASK);
  const [updateTaskMutation] = useMutation(UPDATE_TASK);
  const [deleteTaskMutation] = useMutation(DELETE_TASK);

  const todos = useMemo(() => {
    return data ? data.tasks : [];
  }, [data]);

  const isEmpty = todos.length === 0;

  const totalTodos = todos.length;

  const totalDoneTodos = useMemo(() => todos.filter((todo) => todo.completed).length, [todos]);

  // Converte `undefined` em `null` para o valor de `error`
  const error = queryError ?? null;

  // Função para adicionar uma nova tarefa
  const addTodo = useCallback(
    async (title: string) => {
      try {
        await addTaskMutation({ variables: { title } });
        refetch(); // Refetch tasks após adicionar uma nova tarefa
      } catch (err) {
        console.error("Error adding task:", err);
      }
    },
    [addTaskMutation, refetch]
  );

  const toggleTodo = useCallback(
    async (id: string, completed: boolean) => {
      try {
        await updateTaskMutation({
          variables: { id, completed },
          update: (cache, { data: { updateTask } }) => {
            const existingTasks = cache.readQuery({ query: GET_TASKS });
            const updatedTasks = existingTasks.tasks.map((task) =>
              task.id === id ? { ...task, completed } : task
            );
            cache.writeQuery({
              query: GET_TASKS,
              data: { tasks: updatedTasks },
            });
          },
        });
      } catch (err) {
        console.error("Error updating task:", err);
      }
    },
    [updateTaskMutation]
  );

  // Função para remover uma tarefa
  const removeTodo = useCallback(
    async (id: string) => {
      console.log("Deleting task with ID:", id); // Log para verificar o valor do ID
      try {
        await deleteTaskMutation({ variables: { id } });
        refetch();
      } catch (err) {
        console.error("Error deleting task:", err);
      }
    },
    [deleteTaskMutation, refetch]
  );

  const value = useMemo(
    () => ({
      todos,
      totalTodos,
      totalDoneTodos,
      isEmpty,
      loading,
      error, // Agora aceita ApolloError ou null
      addTodo,
      toggleTodo,
      removeTodo,
    }),
    [todos, totalTodos, totalDoneTodos, isEmpty, loading, error, addTodo, toggleTodo, removeTodo]
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}
