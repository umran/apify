const createGraphqlObjectType = require('./createGraphqlObjectType')
const createGraphqlInputType = require('./createGraphqlInputType')

module.exports = (schemas, resolver) => {
  return Object.keys(schemas).reduce((accumulator, schemaKey) => {
    accumulator[schemaKey] = {
      objectType: createGraphqlObjectType(schemaKey, schemas, accumulator, resolver)
    }

    if (schemas[schemaKey].class === 'embedded') {
      accumulator[schemaKey].inputType = createGraphqlInputType(schemaKey, schemas, accumulator, resolver)
    }

    return accumulator

  }, {})
}

