const expect = require('chai').expect
const generateGraphqlTypes = require('../src/generateGraphqlTypes')
const data = require('./data').generateGraphqlTypes
const errors = require('../src/errors')
const { GraphQLList, GraphQLObjectType, GraphQLSchema } = require('graphql')

describe('generateGraphqlTypes()', () => {
  it('should take valid configuration schemas and return valid GraphQLObjectType objects', () => {

    const configurationSchemas = data.configurationSchemas
    const dummyResolver = (method, model, root, args, context) => {
    	return 'hello world'
    }

    const graphqlTypes = generateGraphqlTypes(configurationSchemas, dummyResolver)

    Object.keys(graphqlTypes).forEach(schemaKey => {
      expect(graphqlTypes[schemaKey].objectType).to.be.instanceOf(GraphQLObjectType)
    })

    const Query = new GraphQLObjectType({
      name: 'Query',
      fields: Object.keys(graphqlTypes).reduce((accumulator, schemaKey) => {
        accumulator[`findOne${schemaKey}`] = {
          type: graphqlTypes[schemaKey].objectType
        }

        accumulator[`find${schemaKey}`] = {
          type: new GraphQLList(graphqlTypes[schemaKey].objectType)
        }

        return accumulator
      }, {})
    })

    const schema = new GraphQLSchema({
      query: Query
    })

  })

})