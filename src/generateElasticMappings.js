const { associateReferences, mergeReferences, classifyReferences, determineOrder } = require('./schemaUtils')

module.exports = schemas => {
  const associatedReferences = associateReferences(schemas)
  const mergedReferences = mergeReferences(associatedReferences)
  const classifiedReferences = classifyReferences(schemas, mergedReferences)

  // determine order of schema generation based on dependencies
  const schemaOrder = determineOrder(schemas, associatedReferences)

  var generatedMappings = {}

  for (var i = 0; i < schemaOrder.length; i++) {
    generatedMappings[schemaOrder[i]] = generateMapping(schemas[schemaOrder[i]], generatedMappings)
  }

  return generatedMappings
}

const generateMapping = (schema, generatedMappings) => {
  return {
    properties: Object.keys(schema.fields).reduce((generated, fieldKey) => {
      const field = generateField(schema.fields[fieldKey], generatedMappings)

      generated[fieldKey] = field

      return generated

    }, {})
  }
}

const generateField = (field, generatedMappings) => {
  switch (field.type) {
    case "string":
      return generateStringField(field)
    case "integer":
      return generateIntegerField(field)
    case "float":
      return generateFloatField(field)
    case "boolean":
      return generateBooleanField(field)
    case "date":
      return generateDateField(field)
    case "array":
      return generateArrayField(field, generatedMappings)
    case "reference":
      return generateReferenceField(field, generatedMappings)
  }
}

const generateStringField = field => {
  return {
    type: field.es_keyword ? 'keyword' : 'text',
    index: field.es_indexed
  }
}

const generateIntegerField = field => {
  return {
    type: 'integer',
    index: field.es_indexed
  }
}

const generateFloatField = field => {
  return {
    type: 'float',
    index: field.es_indexed
  }
}

const generateBooleanField = field => {
  return {
    type: 'boolean',
    index: field.es_indexed
  }
}

const generateDateField = field => {
  return {
    type: 'date',
    index: field.es_indexed
  }
}

const generateReferenceField = (field, generatedMappings) => {
  return {
    type: 'object',
    enabled: field.es_indexed,
    properties: generatedMappings[field.ref].properties
  }
}

const generateArrayField = (field, generatedMappings) => {
  const _field = generateField(field.item, generatedMappings)

  if (_field.type === 'object') {
    return {
      type: 'nested',
      properties: _field.properties
    }
  }

  return _field
}
