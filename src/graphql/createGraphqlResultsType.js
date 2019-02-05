const { GraphQLObjectType, GraphQLNonNull, GraphQLList, GraphQLString } = require('graphql')

module.exports = (schemaKey, objectType) => {
  return new GraphQLObjectType({
    name: `_${schemaKey}Results`,
    fields: () => ({
      results: {
        type: new GraphQLNonNull(new GraphQLList(objectType))
      },
      cursor: {
        type: GraphQLString
      }
    })
  })
}