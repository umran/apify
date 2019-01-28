const MongooseSchema = require('mongoose').Schema
const { associateReferences, mergeReferences, classifyReferences, determineOrder } = require('./schemaUtils')

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
    case "association":
      return generateAssociationField(field)
  }
}

const generateStringField = field => {
  let result =  {
    type: String,
    required: field.required
  }

  if (field.enum) {
    result.enum = field.enum
  }

  if (field.default) {
    result.default = feild.default
  }

  return result
}

const generateNumberField = field => {
  let result = {
    type: Number,
    required: field.required
  }

  if (field.enum) {
    result.enum = field.enum
  }

  if (field.default) {
    result.default = feild.default
  }

  return result
}

const generateBooleanField = field => {
  let result =  {
    type: Boolean,
    required: field.required
  }

  if (field.default) {
    result.default = field.default
  }

  return result
}

const generateDateField = field => {
  let result = {
    type: Date,
    required: field.required
  }

  if (field.enum) {
    result.enum = field.enum
  }

  if (field.default) {
    result.default = feild.default
  }

  return result
}

const generateReferenceField = (field, classifiedReferences, generatedSchemaContents, generatedSchemas) => {
  if (classifiedReferences[field.ref] === "collection") {
    return {
      field: {
        type: MongooseSchema.Types.ObjectId,
        required: field.required,
        ref: field.ref
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

const generateAssociationField = (field) => {
  return {
    field: {
      type: MongooseSchema.Types.ObjectId,
      required: false,
      ref: field.ref
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
