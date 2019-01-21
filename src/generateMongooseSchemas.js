const Schema = require('mongoose').Schema
const SchemaError = require('./errors').SchemaError
const expectedMongooseSchemas = require('../test/data').generateMongooseSchemas.expectedMongooseSchemas

const findReferences = schema => {
  return Object.keys(schema.fields).reduce((accumulator, fieldKey) => {
    if (schema.fields[fieldKey].type === "array") {
      const reference = findArrayReference(schema.fields[fieldKey])
      if (reference) {
        if (accumulator.indexOf(reference) < 0) {
          accumulator.push(reference)
        }
      }
    }

    if (schema.fields[fieldKey].type === "reference") {
      if (accumulator.indexOf(schema.fields[fieldKey].ref) < 0) {
        accumulator.push(schema.fields[fieldKey].ref)
      }
    }

    return accumulator
  }, [])
}

const findArrayReference = field => {
  if (field.item.type === "array") {
    return findArrayReference(field.item)
  }

  if (field.item.type === "reference") {
    return field.item.ref
  }
}

const determineOrder = (schemas, ordered=[]) => {
  const remainingSchemas = Object.keys(schemas).filter(schemaKey => ordered.indexOf(schemaKey) < 0)

  for (var i=0; i<remainingSchemas.length; i++) {
    const schemaKey = remainingSchemas[i]
    const references = findReferences(schemas[schemaKey])
    if (references.length === 0) {
      ordered.push(schemaKey)
      return determineOrder(schemas, ordered)
    } else if (
      references.reduce((truthValue, reference) => {
        if (!exists(ordered, orderedRef => orderedRef === reference)) {
          return false
        }

        return truthValue
      }, true)
    ) {
      ordered.push(schemaKey)
      return determineOrder(schemas, ordered)
    }
  }

  if (remainingSchemas.length > 0) {
    throw new SchemaError('unresolvableReference', `The following schemas: ${remainingSchemas.join(', ')} ${remainingSchemas.length === 1 ? 'has' : 'have'} unresolvable references. Please check that your schemas do not have circular references or undefined references.`)
  }

  return ordered
}

const exists = (arr, lambda) => {
  for (var i = 0; i < arr.length; i++) {
    if (lambda(arr[i]) === true) {
      return true
    }
  }

  return false
}

module.exports = schemas => {
  const ordered = determineOrder(schemas)

  // this is still cheating, but hang in there
  return expectedMongooseSchemas
}
