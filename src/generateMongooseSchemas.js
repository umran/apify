const MongooseSchema = require('mongoose').Schema
const SchemaError = require('./errors').SchemaError

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
  if (field.item.type === "reference") {
    return field.item.ref
  }
}

const associateReferences = schemas => {
  return Object.keys(schemas).reduce((accumulator, schemaKey) => {
    accumulator[schemaKey] = findReferences(schemas[schemaKey])
    return accumulator
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

const generateSchema = (schema, classifiedReferences, generatedSchemaContents, generatedSchemas) => {
  const generatedSchemaObject = Object.keys(schema.fields).reduce((generated, fieldKey) => {
    const { field, fieldContent } = generateField(schema.fields[fieldKey], classifiedReferences, generatedSchemaContents, generatedSchemas)

    generated.schema[fieldKey] = field
    generated.schemaContent[fieldKey] = fieldContent ? fieldContent : field

    return generated

  }, { schema: {}, schemaContent: {} })

  return {
    generatedSchema: new MongooseSchema(generatedSchemaObject.schema),
    generatedSchemaContent: generatedSchemaObject.schemaContent
  }
}

const generateField = (field, classifiedReferences, generatedSchemaContents, generatedSchemas) => {
  switch (field.type) {
    case "string":
      return { field: generateStringField(field) }
    case "integer":
      return { field: generateNumberField(field) }
    case "float":
      return { field: generateNumberField(field) }
    case "boolean":
      return { field: generateBooleanField(field) }
    case "date":
      return { field: generateDateField(field) }
    case "array":
      return generateArrayField(field, classifiedReferences, generatedSchemaContents, generatedSchemas)
    case "reference":
      return generateReferenceField(field, classifiedReferences, generatedSchemaContents, generatedSchemas)
  }
}

const generateStringField = field => {
  return {
    type: String,
    required: field.required
  }
}

const generateNumberField = field => {
  return {
    type: Number,
    required: field.required
  }
}

const generateBooleanField = field => {
  return {
    type: Boolean,
    required: field.required
  }
}

const generateDateField = field => {
  return {
    type: Date,
    required: field.required
  }
}

const generateReferenceField = (field, classifiedReferences, generatedSchemaContents, generatedSchemas) => {
  if (classifiedReferences[field.ref] === "collection") {
    return {
      field: {
        type: MongooseSchema.Types.ObjectId,
        required: field.required,
        ref: upperCaseFirstLetter(field.ref)
      }
    }
  }

  return {
    fieldContent: {
      type: generatedSchemaContents[field.ref],
      required: field.required
    },
    field: {
      type: generatedSchemas[field.ref],
      required: field.required
    }
  }
}

const generateArrayField = (_field, classifiedReferences, generatedSchemaContents, generatedSchemas) => {
  const { field, fieldContent } = generateField(_field.item, classifiedReferences, generatedSchemaContents, generatedSchemas)

  return {
    fieldContent: fieldContent ? {
      type: [fieldContent],
      required: _field.required
    } : fieldContent,
    field: {
      type: [field],
      required: _field.required
    }
  }
}

// utility functions
const exists = (arr, lambda) => {
  for (var i = 0; i < arr.length; i++) {
    if (lambda(arr[i]) === true) {
      return true
    }
  }

  return false
}

const upperCaseFirstLetter = string => {
  return string.charAt(0).toUpperCase().concat(string.slice(1))
}

module.exports = schemas => {
  const associatedReferences = associateReferences(schemas)
  const mergedReferences = mergeReferences(associatedReferences)
  const classifiedReferences = classifyReferences(schemas, mergedReferences)

  // determine order of schema generation based on dependencies
  const schemaOrder = determineOrder(schemas, associatedReferences)

  var generatedSchemaContents = {}
  var generatedSchemas = {}

  for (var i = 0; i < schemaOrder.length; i++) {
    const { generatedSchemaContent, generatedSchema } = generateSchema(schemas[schemaOrder[i]], classifiedReferences, generatedSchemaContents, generatedSchemas)

    generatedSchemaContents[schemaOrder[i]] = generatedSchemaContent
    generatedSchemas[schemaOrder[i]] = generatedSchema
  }

  return {
    generatedSchemaContents,
    generatedSchemas
  }
}
