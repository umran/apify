const { GraphQLObjectType, GraphQLID, GraphQLNonNull } = require('graphql')
const { FindOptions, SearchOptions } = require('./staticGraphqlInputTypes')
const generateArg = require('./createGraphqlArg')
const generateStrictArg = require('./createGraphqlStrictArg')

module.exports = (schemas, types, resolver) => {
  return new GraphQLObjectType({
    name: 'Mutation',
    fields: Object.keys(schemas).reduce((accumulator, schemaKey) => {
      if (schemas[schemaKey].class === 'collection') {
        accumulator[`create_${schemaKey}`] = createCreateField(schemaKey, schemas, types, resolver)
        accumulator[`update_${schemaKey}`] = createUpdateField(schemaKey, schemas, types, resolver)
        accumulator[`delete_${schemaKey}`] = createDeleteField(schemaKey, resolver)
      }

      return accumulator
    }, {})
  })
}

const createCreateField = (schemaKey, schemas, types, resolver) => {
  return {
    type: new GraphQLNonNull(GraphQLID),
    args: Object.keys(schemas[schemaKey].fields).reduce((accumulator, fieldKey) => {
      accumulator[fieldKey] = generateStrictArg(schemas[schemaKey].fields[fieldKey], schemas, types)
      return accumulator
    }, {}),
    resolve: async (root, args, context) => {
      return await resolver({
        method: 'create',
        collection: schemaKey,
        root,
        args,
        context
      })
    }
  }
}

const createUpdateField = (schemaKey, schemas, types, resolver) => {
  return {
    type: new GraphQLNonNull(GraphQLID),
    args: Object.keys(schemas[schemaKey].fields).reduce((accumulator, fieldKey) => {
      accumulator[fieldKey] = generateArg(schemas[schemaKey].fields[fieldKey], schemas, types)
      return accumulator
    }, { _id: { type: new GraphQLNonNull(GraphQLID) } }),
    resolve: async (root, args, context) => {
      return await resolver({
        method: 'update',
        collection: schemaKey,
        root,
        args,
        context
      })
    }
  }
}

const createDeleteField = (schemaKey, resolver) => {
  return {
    type: new GraphQLNonNull(GraphQLID),
    args: {
      _id: {
        type: new GraphQLNonNull(GraphQLID)
      }
    },
    resolve: async (root, args, context) => {
      return await resolver({
        method: 'delete',
        collection: schemaKey,
        root,
        args,
        context
      })
    }
  }
}
