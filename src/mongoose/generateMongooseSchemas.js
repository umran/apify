const MongooseSchema = require('mongoose').Schema

module.exports = schemas => {
  return Object.keys(schemas).reduce((accumulator, schemaKey) => {
    accumulator[schemaKey] = () => generateSchema(schemas[schemaKey], schemas, accumulator)

    return accumulator
  }, {})
}

const generateSchema = (schema, schemas, generatedSchemas) => {
  return new MongooseSchema(Object.keys(schema.fields).reduce((generated, fieldKey) => {
    generated[fieldKey] = generateField(schema.fields[fieldKey], schemas, generatedSchemas)

    return generated

  }, {}))
}

const generateField = (field, schemas, generatedSchemas) => {
  switch (field.type) {
    case "string":
      return generateStringField(field)
    case "integer":
      return generateNumberField(field)
    case "float":
      return generateNumberField(field)
    case "boolean":
      return generateBooleanField(field)
    case "date":
      return generateDateField(field)
    case "array":
      return generateArrayField(field, schemas, generatedSchemas)
    case "reference":
      return generateReferenceField(field, schemas, generatedSchemas)
  }
}

const generateStringField = field => {
  let result = {
    type: String,
    required: field.required
  }

  if (field.enum) {
    result.enum = field.enum
  }

  if (field.default) {
    result.default = field.default
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

  if (field.default || field.default === 0) {
    result.default = field.default
  }

  return result
}

const generateBooleanField = field => {
  let result = {
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

  if (field.default) {
    if (field.default === 'current_date') {
      result.default = Date.now
    } else {
      result.default = new Date(field.default)
    }
  }

  return result
}

const generateReferenceField = (field, schemas, generatedSchemas) => {
  if (schemas[field.ref].class === "collection") {
    return {
      type: MongooseSchema.Types.ObjectId,
      required: field.required,
      ref: field.ref
    }
  }

  return {
    type: generatedSchemas[field.ref](),
    required: field.required
  }
}

const generateArrayField = (_field, schemas, generatedSchemas) => {
  const field = generateField(_field.item, schemas, generatedSchemas)

  return {
    type: [field],
    required: _field.required
  }
}
