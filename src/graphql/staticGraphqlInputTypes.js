const { GraphQLInputObjectType, GraphQLBoolean, GraphQLString, GraphQLInt, GraphQLList } = require('graphql')

const FindOptions = new GraphQLInputObjectType({
  name: '_FindOptions',
  fields: {
    paginate: {
      type: GraphQLBoolean
    },
    paginatedField: {
      type: GraphQLString
    },
    sortDirection: {
      type: GraphQLInt
    },
    limit: {
      type: GraphQLInt
    },
    cursor: {
      type: GraphQLString
    }
  }
})

const SearchOptions = new GraphQLInputObjectType({
  name: '_SearchOptions',
  fields: {
    paginate: {
      type: GraphQLBoolean
    },
    paginatedField: {
      type: GraphQLString
    },
    sortDirection: {
      type: GraphQLInt
    },
    limit: {
      type: GraphQLInt
    },
    cursor: {
      type: GraphQLString
    },
    matchFields: {
      type: new GraphQLList(GraphQLString)
    } 
  }
})

module.exports = {
  FindOptions,
  SearchOptions
}