const { GraphQLInputObjectType, GraphQLNonNull, GraphQLList, GraphQLID, GraphQLInt, GraphQLFloat, GraphQLString, GraphQLBoolean } = require('graphql')
const { GraphQLDateTime } = require('graphql-iso-date')

module.exports = (schemaKey, schemas, types) => {
  const fields = schemas[schemaKey].fields

  return new GraphQLInputObjectType({
    name: `_${schemaKey}StrictInput`,
    fields: () => Object.keys(fields).reduce((accumulator, fieldKey) => {
      accumulator[fieldKey] = generateField(fields[fieldKey], schemas, types)
      
      return accumulator
    
    }, {})
  })
}

const generateField = (field, schemas, types, inArray=false) => {
  switch(field.type) {
    case 'string':
      return generateStringField(field, inArray)
    case 'integer':
      return generateIntegerField(field, inArray)
    case 'float':
      return generateFloatField(field, inArray)
    case 'boolean':
      return generateBooleanField(field, inArray)
    case 'date':
      return generateDateField(field, inArray)
    case 'reference':
      return generateReferenceField(field, schemas, types, inArray)
    case 'association':
      return generateReferenceField(field, schemas, types, inArray)
    case 'array':
      return generateArrayField(field, schemas, types)
  }
}

const generateStringField = (field, inArray) => {
  let type = field.required ? new GraphQLNonNull(GraphQLString) : GraphQLString

  if (inArray) {
    return type
  }

  return {
    type
  }
}

const generateIntegerField = (field, inArray) => {
  let type = field.required ? new GraphQLNonNull(GraphQLInt) : GraphQLInt

  if (inArray) {
    return type
  }

  return {
    type
  }
}

const generateFloatField = (field, inArray) => {
  let type = field.required ? new GraphQLNonNull(GraphQLFloat) : GraphQLFloat

  if (inArray) {
    return type
  }

  return {
    type
  }
}

const generateBooleanField = (field, inArray) => {
  let type = field.required ? new GraphQLNonNull(GraphQLBoolean) : GraphQLBoolean

  if (inArray) {
    return type
  }

  return {
    type
  }
}

const generateDateField = (field, inArray) => {
  let type = field.required ? new GraphQLNonNull(GraphQLDateTime) : GraphQLDateTime

  if (inArray) {
    return type
  }

  return {
    type
  }
}

const generateReferenceField = (field, schemas, types, inArray) => {
  let type
  if (schemas[field.ref].class === 'collection') {
    type = field.required ? new GraphQLNonNull(GraphQLID) : GraphQLID
  } else {
    type = field.required ? new GraphQLNonNull(types[field.ref].strictInputType) : types[field.ref].strictInputType
  }

  if (inArray) {
    return type
  }

  return {
    type
  }
}

const generateArrayField = (field, schemas, types) => {
  let type = field.required ? new GraphQLNonNull(new GraphQLList(generateField(field.item, schemas, types, true))) : new GraphQLList(generateField(field.item, schemas, types, true))

  return {
    type
  }
}