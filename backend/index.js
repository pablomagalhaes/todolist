// index.js
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');
const { sequelize } = require('./db');
const cors = require('cors');

const app = express();
app.use(cors()); // Allow CORS
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true, // Enable GraphiQL for testing
}));

// Sync database and start server
sequelize.sync().then(() => {
  app.listen(4000, () => {
    console.log('Server running on http://localhost:4000');
  });
});
