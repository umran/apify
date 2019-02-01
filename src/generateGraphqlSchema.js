const { GraphQLSchema } = require('graphql')

module.exports = (query, mutation) => {
  return new GraphQLSchema({
    query,
    mutation
  })
}