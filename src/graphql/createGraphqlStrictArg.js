const { GraphQLNonNull, GraphQLID, GraphQLList, GraphQLString, GraphQLInt, GraphQLFloat, GraphQLBoolean } = require('graphql')
const { GraphQLDateTime } = require('graphql-iso-date')

const generateArg = (field, schemas, types, inArray=false) => {
  switch(field.type) {
    case 'string':
      return generateStringArg(field, inArray)
    case 'integer':
      return generateIntegerArg(field, inArray)
    case 'float':
      return generateFloatArg(field, inArray)
    case 'boolean':
      return generateBooleanArg(field, inArray)
    case 'date':
      return generateDateArg(field, inArray)
    case 'reference':
      return generateReferenceArg(field, schemas, types, inArray)
    case 'array':
      return generateArrayArg(field, schemas, types)
  }
}

const generateStringArg = (field, inArray) => {
  let type = field.required ? new GraphQLNonNull(GraphQLString) : GraphQLString

  if (inArray) {
    return type
  }

  return {
    type
  }
}

const generateIntegerArg = (field, inArray) => {
  let type = field.required ? new GraphQLNonNull(GraphQLInt) : GraphQLInt

  if (inArray) {
    return type
  }

  return {
    type
  }
}

const generateFloatArg = (field, inArray) => {
  let type = field.required ? new GraphQLNonNull(GraphQLFloat) : GraphQLFloat

  if (inArray) {
    return type
  }

  return {
    type
  }
}

const generateBooleanArg = (field, inArray) => {
  let type = field.required ? new GraphQLNonNull(GraphQLBoolean) : GraphQLBoolean

  if (inArray) {
    return type
  }

  return {
    type
  }
}

const generateDateArg = (field, inArray) => {
  let type = field.required ? new GraphQLNonNull(GraphQLDateTime) : GraphQLDateTime

  if (inArray) {
    return type
  }

  return {
    type
  }
}

const generateReferenceArg = (field, schemas, types, inArray) => {
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

const generateArrayArg = (field, schemas, types) => {
  let type = field.required ? new GraphQLNonNull(new GraphQLList(generateArg(field.item, schemas, types, true))) : new GraphQLList(generateArg(field.item, schemas, types, true))

  return {
    type
  }
}

module.exports = generateArg
