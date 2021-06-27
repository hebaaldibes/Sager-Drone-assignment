const graphql = require('graphql');

const userSchema = require('./schemas/user');

module.exports = graphql.buildSchema(`
${userSchema.User}
${userSchema.UserInput}


type RootQuery {
  ${userSchema.UserQueries}
}

type RootMutation{
  ${userSchema.UserMutation}
}

schema{
  query:RootQuery
  mutation: RootMutation
}
`)
