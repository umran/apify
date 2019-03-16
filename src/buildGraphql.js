const buildBackend = require('./buildBackend')
const graphql = require('./graphql')

module.exports = (schemas, generateResolver) => {
  const backend = buildBackend(schemas)

  // generate resolver function
  const resolver = generateResolver({ ...backend, schemas })

  // generate graphql schema
  const types = graphql.generateGraphqlTypes(schemas, resolver)
  const queries = graphql.generateGraphqlQueries(schemas, types, resolver)
  const mutations = graphql.generateGraphqlMutations(schemas, types, resolver)
  const graphqlSchema = graphql.generateGraphqlSchema(queries, mutations)

  return {
    graphqlSchema,
    backend
  }
}
