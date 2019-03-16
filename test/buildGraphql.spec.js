const expect = require('chai').expect
const buildGraphql = require('../src/buildGraphql')
const data = require('./data').buildGraphql
const { GraphQLSchema } = require('graphql')

const mongoose = require('mongoose')

describe('buildGraphql()', () => {
  it('should take valid configuration schemas and a resolver generator and return a valid GraphQL schema', () => {

    // cleanup mongoose
    mongoose.models = {}
    mongoose.modelSchemas = {}

    const configurationSchemas = data.configurationSchemas

    const dummyGenerateResolver = ({ mongoose_models, elastic_mappings, schemas }) => async ({ method, collection, root, args, context }) => {
      return
    }

    const graphqlSchema = buildGraphql(configurationSchemas, dummyGenerateResolver)

    expect(graphqlSchema).to.be.instanceOf(GraphQLSchema)

  })

})
