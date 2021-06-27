const express = require("express");
const {graphqlHTTP} = require("express-graphql");
const cors = require('cors');
const bodyParser = require('body-parser');

const schema = require("./graphql/schema");
const resolvers = require("./graphql/resolvers")

const db = require('./database/database');

const app = express();
app.use(cors());

app.use("/graphql",graphqlHTTP({
    schema: schema,
    rootValue:resolvers,
    graphiql: true,
  })
);
db.sequelize.authenticate()
.then(() => {
  app.listen(4000);
  console.log("Running a GraphQL API server  with DB at localhost:4000/graphql");
})
.catch(err => console.log(err));