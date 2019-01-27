const SchemaError = require('./errors').SchemaError
const { exists } = require('./utils')

const findArrayReference = field => {
  if (field.item.type === "reference") {
    return field.item.ref
  }
}

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

const associateReferences = schemas => {
  return Object.keys(schemas).reduce((accumulator, schemaKey) => {
    accumulator[schemaKey] = findReferences(schemas[schemaKey])
    return accumulator
  }, {})
}

const mergeReferences = associatedReferences => {
  return Object.keys(associatedReferences).reduce((accumulator, schemaKey) => {
    const references = associatedReferences[schemaKey]
    for (var i = 0; i < references.length; i++) {
      if (accumulator.indexOf(references[i]) < 0) {
        accumulator.push(references[i])
      }
    }
    return accumulator
  }, [])
}

const classifyReferences = (schemas, mergedReferences) => {
  return mergedReferences.reduce((classified, referenceKey) => {
    if (!schemas[referenceKey]) {
      throw new SchemaError('undefinedReference', `the following reference: ${referenceKey} is undefined`)
    }

    classified[referenceKey] = schemas[referenceKey].class
    return classified
  }, {})
}

const determineOrder = (schemas, associatedReferences, ordered=[]) => {
  const remainingSchemas = Object.keys(schemas).filter(schemaKey => ordered.indexOf(schemaKey) < 0)

  for (var i = 0; i < remainingSchemas.length; i++) {
    const schemaKey = remainingSchemas[i]
    const references = associatedReferences[schemaKey]
    if (references.length === 0) {
      ordered.push(schemaKey)
      return determineOrder(schemas, associatedReferences, ordered)
    } else if (
      references.reduce((truthValue, reference) => {
        if (!exists(ordered, orderedRef => orderedRef === reference)) {
          return false
        }

        return truthValue
      }, true)
    ) {
      ordered.push(schemaKey)
      return determineOrder(schemas, associatedReferences, ordered)
    }
  }

  if (remainingSchemas.length > 0) {
    throw new SchemaError('circularReference', `The following schemas: ${remainingSchemas.join(', ')} have circular references. Please ensure your schemas do not have circular references.`)
  }

  return ordered
}

module.exports = {
  associateReferences,
  mergeReferences,
  classifyReferences,
  determineOrder
}
