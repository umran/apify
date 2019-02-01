const { GraphQLInputObjectType, GraphQLNonNull, GraphQLList, GraphQLID, GraphQLInt, GraphQLFloat, GraphQLString, GraphQLBoolean } = require('graphql')
const { GraphQLDateTime } = require('graphql-iso-date')

module.exports = (schemaKey, schemas, types, resolver) => {
  const fields = schemas[schemaKey].fields

  return new GraphQLInputObjectType({
    name: `_${schemaKey}`,
    fields: () => Object.keys(fields).reduce((accumulator, fieldKey) => {
      accumulator[fieldKey] = generateField(fieldKey, fields[fieldKey], schemas, types, resolver)
      
      return accumulator
    
    }, { _id: { type: GraphQLID } })
  })
}

const generateField = (fieldKey, field, schemas, types, resolver, inArray=false) => {
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
      return generateReferenceField(fieldKey, field, schemas, types, resolver, inArray)
    case 'association':
      return generateReferenceField(fieldKey, field, schemas, types, resolver, inArray)
    case 'array':
      return generateArrayField(fieldKey, field, schemas, types, resolver)
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

const generateReferenceField = (fieldKey, field, schemas, types, resolver, inArray) => {
  let type = field.required ? new GraphQLNonNull(GraphQLID) : GraphQLID

  if (inArray) {
    return type
  }

  return {
    type
  }
}

const generateArrayField = (fieldKey, field, schemas, types, resolver) => {
  let type = field.required ? new GraphQLNonNull(new GraphQLList(generateField(fieldKey, field.item, schemas, types, resolver, true))) : new GraphQLList(generateField(fieldKey, field.item, schemas, types, resolver, true))

  return {
    type
  }
}