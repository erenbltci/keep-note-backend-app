require('dotenv').config();

import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import express from 'express';

const app = express();


const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
  hello: () => {
    return 'Hello world!';
  },
};

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);


app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
