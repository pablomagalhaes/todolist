
# Todo List Full-Stack Application

This is a full-stack todo list application that includes a **Next.js frontend** using **Apollo Client** for GraphQL communication and a **Node.js backend** with **Express**, **GraphQL**, and **SQLite** for data storage.

<p align="center">
  <img src="https://github.com/pablomagalhaes/todolist/tree/main/frontend/src/assets/previews/preview.png" width="700"/>
</p>

## Features

- **Backend**:
  - Fetch all tasks.
  - Add a new task.
  - Update an existing task (title or completion status).
  - Delete a task.
  - Data stored using **SQLite**.
  - **GraphQL** API with error handling for invalid requests.
  
- **Frontend**:
  - Built with **Next.js** and **Apollo Client**.
  - Displays a list of tasks with filtering by completed and uncompleted tasks.
  - Add, update, and delete tasks from the UI.
  - Export tasks as a **CSV** file.
  - Basic CSS styling for a clean and user-friendly interface.

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or above)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

## Setup Instructions

### 1. Backend Setup (Node.js with GraphQL and SQLite)

#### a. Navigate to the backend directory

```bash
cd todolist backend
```

#### b. Install dependencies

```bash
npm install
```

#### c. Start the backend server

```bash
npm run dev
```

The backend will start on `http://localhost:4000/graphql`, and you can use the GraphiQL interface to test queries and mutations.

### 2. Frontend Setup (Next.js with Apollo Client)

#### a. Navigate to the frontend directory

```bash
cd todolist frontend
```

#### b. Install dependencies

```bash
npm install
```

#### c. Start the frontend development server

```bash
npm run dev
```

The frontend will start on `http://localhost:3000`.

## Project Structure

```bash
/backend      # Backend (Node.js, GraphQL, SQLite)
  ├── db.js                # SQLite and Sequelize setup
  ├── index.js             # Express server setup with GraphQL
  └── schema.js            # GraphQL schema and resolvers

/frontend      # Frontend (Next.js, Apollo Client, React)
  ├── /src
  │   ├── /lib
  │   │   └── apolloClient.ts  # Apollo Client setup
  │   ├── /app
  │   │   └── page.tsx         # Todo List page
  │   │   └── _app.tsx         # ApolloProvider setup
  │   └── /styles
  │       └── globals.css      # Global styles
  ├── next.config.ts           # Next.js configuration
  └── tsconfig.json            # TypeScript configuration
```

## GraphQL API

Here are the GraphQL queries and mutations you can use to interact with the backend:

### Query: Fetch all tasks

```graphql
query {
  tasks {
    id
    title
    completed
    date_created
  }
}
```

### Mutation: Add a new task

```graphql
mutation {
  addTask(title: "New Task") {
    id
    title
    completed
  }
}
```

### Mutation: Update an existing task

```graphql
mutation {
  updateTask(id: 1, title: "Updated Task", completed: true) {
    id
    title
    completed
  }
}
```

### Mutation: Delete a task

```graphql
mutation {
  deleteTask(id: 1)
}
```

## Exporting Tasks as CSV

The frontend provides a button to export the tasks as a **CSV** file. Just click the "Download CSV" button to download a CSV with all tasks.

## Error Handling

The backend includes basic error handling, such as:
- Trying to update or delete a task that doesn't exist will result in an error.
- Duplicate task titles on the same date will trigger an error.

## License

This project is licensed under the MIT License.