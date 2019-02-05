const { GraphQLObjectType, GraphQLID, GraphQLNonNull, GraphQLString } = require('graphql')
const { FindOptions, SearchOptions } = require('./staticGraphqlInputTypes')
const generateArg = require('./createGraphqlArg')

module.exports = (schemas, types, resolver) => {
  return new GraphQLObjectType({
    name: 'Query',
    fields: Object.keys(schemas).reduce((accumulator, schemaKey) => {
      if (schemas[schemaKey].class === 'collection') {
        accumulator[`findOne_${schemaKey}`] = createFindOneField(schemaKey, types, resolver)
        accumulator[`find_${schemaKey}`] = createFindField(schemaKey, schemas, types, resolver)
        accumulator[`search_${schemaKey}`] = createSearchField(schemaKey, types, resolver)
      }

      return accumulator
    }, {})
  })
}

const createFindOneField = (schemaKey, types, resolver) => {
  return {
    type: types[schemaKey].objectType,
    args: {
      _id: {
        type: new GraphQLNonNull(GraphQLID)
      }
    },
    resolve: async (root, args, context) => {
      return await resolver('findOne', schemaKey, root, args, context)
    }
  }
}

const createFindField = (schemaKey, schemas, types, resolver) => {
  return {
    type: new GraphQLNonNull(types[schemaKey].resultsType),
    args: Object.keys(schemas[schemaKey].fields).reduce((accumulator, fieldKey) => {
      accumulator[fieldKey] = generateArg(schemas[schemaKey].fields[fieldKey], schemas, types)
      return accumulator
    }, { _id: { type: GraphQLID }, _options: { type: FindOptions } }),
    resolve: async (root, args, context) => {
      return await resolver('find', schemaKey, root, args, context)
    }
  }
}

const createSearchField = (schemaKey, types, resolver) => {
  return {
    type: new GraphQLNonNull(types[schemaKey].resultsType),
    args: {
      query: {
        type: new GraphQLNonNull(GraphQLString)
      },
      _options: {
        type: FindOptions
      }
    },
    resolve: async (root, args, context) => {
      return await resolver('search', schemaKey, root, args, context)
    }
  }
}