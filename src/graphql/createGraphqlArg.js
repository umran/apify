const { GraphQLID, GraphQLList, GraphQLString, GraphQLInt, GraphQLFloat, GraphQLBoolean } = require('graphql')
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
    case 'association':
      return generateReferenceArg(field, schemas, types, inArray)
    case 'array':
      return generateArrayArg(field, schemas, types)
  }
}

const generateStringArg = (field, inArray) => {
  let type = GraphQLString

  if (inArray) {
    return type
  }

  return {
    type
  }
}

const generateIntegerArg = (field, inArray) => {
  let type = GraphQLInt

  if (inArray) {
    return type
  }

  return {
    type
  }
}

const generateFloatArg = (field, inArray) => {
  let type = GraphQLFloat

  if (inArray) {
    return type
  }

  return {
    type
  }
}

const generateBooleanArg = (field, inArray) => {
  let type = GraphQLBoolean

  if (inArray) {
    return type
  }

  return {
    type
  }
}

const generateDateArg = (field, inArray) => {
  let type = GraphQLDateTime

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
    type = GraphQLID
  } else {
    type = types[field.ref].inputType
  }

  if (inArray) {
    return type
  }

  return {
    type
  }
}

const generateArrayArg = (field, schemas, types) => {
  let type = new GraphQLList(generateArg(field.item, schemas, types, true))

  return {
    type
  }
}

module.exports = generateArg