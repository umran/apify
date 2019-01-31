module.exports = schemas => {
  const generatedMappings = Object.keys(schemas).reduce((accumulator, schemaKey) => {
    accumulator[schemaKey] = () => generateMapping(schemaKey, schemas[schemaKey], generatedMappings)

    return accumulator
  }, {})

  return generatedMappings
}

const generateMapping = (schemaKey, schema, generatedMappings) => {
  return {
    properties: Object.keys(schema.fields).reduce((generated, fieldKey) => {
      const field = generateField(schema.fields[fieldKey], schemaKey, generatedMappings)

      if (field) {
        generated[fieldKey] = field
      }

      return generated

    }, {})
  }
}

const generateField = (field, schemaKey, generatedMappings) => {
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
      return generateArrayField(field, schemaKey, generatedMappings)
    case "reference":
      return generateReferenceField(field, schemaKey, generatedMappings)
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

const generateReferenceField = (field, schemaKey, generatedMappings) => {
  // ignore self references
  if (schemaKey === field.ref) {
    return
  }

  return {
    type: 'object',
    enabled: field.es_indexed,
    properties: generatedMappings[field.ref]().properties
  }
}

const generateArrayField = (field, schemaKey, generatedMappings) => {
  const _field = generateField(field.item, schemaKey, generatedMappings)

  if (!_field) {
    return
  }

  if (_field.type === 'object') {
    return {
      type: 'nested',
      properties: _field.properties
    }
  }

  return _field
}
