const { GraphQLObjectType, GraphQLSchema, GraphQLList, GraphQLString, GraphQLBoolean, GraphQLInt } = require('graphql');
const { Task } = require('./db');

const TaskType = new GraphQLObjectType({
  name: 'Task',
  fields: {
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    completed: { type: GraphQLBoolean },
    date_created: { type: GraphQLString },
  },
});

// Root query to fetch all tasks
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    tasks: {
      type: new GraphQLList(TaskType),
      resolve: async () => {
        return await Task.findAll();
      },
    },
  },
});

// Mutations to add, update, and delete tasks
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addTask: {
      type: TaskType,
      args: {
        title: { type: GraphQLString },
      },
      resolve: async (_, { title }) => {
        return await Task.create({ title });
      },
    },
    updateTask: {
      type: TaskType,
      args: {
        id: { type: GraphQLInt },
        title: { type: GraphQLString },
        completed: { type: GraphQLBoolean },
      },
      resolve: async (_, { id, title, completed }) => {
        const task = await Task.findByPk(id);
        if (!task) throw new Error('Task not found');
        if (title) task.title = title;
        if (completed !== undefined) task.completed = completed;
        await task.save();
        return task;
      },
    },
    deleteTask: {
      type: GraphQLString,
      args: {
        id: { type: GraphQLInt },
      },
      resolve: async (_, { id }) => {
        const task = await Task.findByPk(id);
        if (!task) throw new Error('Task not found');
        await task.destroy();
        return `Task ${id} deleted`;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
