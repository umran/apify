const expect = require('chai').expect
const generateGraphqlTypes = require('../src/graphql/generateGraphqlTypes')
const data = require('./data').generateGraphqlTypes
const errors = require('../src/errors')
const { GraphQLObjectType } = require('graphql')

describe('generateGraphqlTypes()', () => {
  it('should take valid configuration schemas and return valid GraphQL objects', () => {

    const configurationSchemas = data.configurationSchemas
    const dummyResolver = (method, model, root, args, context) => {
    	return 'hello world'
    }

    const graphqlTypes = generateGraphqlTypes(configurationSchemas, dummyResolver)

    Object.keys(graphqlTypes).forEach(schemaKey => {
      expect(graphqlTypes[schemaKey].objectType).to.be.instanceOf(GraphQLObjectType)
    })

  })

})