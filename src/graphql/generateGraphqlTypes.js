const createGraphqlObjectType = require('./createGraphqlObjectType')
const createGraphqlInputType = require('./createGraphqlInputType')
const createGraphqlStrictInputType = require('./createGraphqlStrictInputType')
const createGraphqlResultsType = require('./createGraphqlResultsType')

module.exports = (schemas, resolver) => {
  return Object.keys(schemas).reduce((accumulator, schemaKey) => {
    accumulator[schemaKey] = {
      objectType: createGraphqlObjectType(schemaKey, schemas, accumulator, resolver)
    }

    if (schemas[schemaKey].class === 'embedded') {
      accumulator[schemaKey].inputType = createGraphqlInputType(schemaKey, schemas, accumulator)
      accumulator[schemaKey].strictInputType = createGraphqlStrictInputType(schemaKey, schemas, accumulator)
    } else {
      accumulator[schemaKey].resultsType = createGraphqlResultsType(schemaKey, accumulator[schemaKey].objectType)
    }

    return accumulator

  }, {})
}

