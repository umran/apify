const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLInt, GraphQLFloat, GraphQLString, GraphQLBoolean } = require('graphql')
const { GraphQLDateTime } = require('graphql-iso-date')

module.exports = (schemas, resolver) => {
  return Object.keys(schemas).reduce((accumulator, schemaKey) => {
    accumulator[schemaKey] = {
      objectType: createObjectType(schemaKey, schemas, accumulator, resolver)
    }

    return accumulator

  }, {})
}

const createObjectType = (schemaKey, schemas, types, resolver) => {
  const fields = schemas[schemaKey].fields

  return new GraphQLObjectType({
    name: schemaKey,
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
  if (inArray) {
    return GraphQLString
  }

  return {
    type: GraphQLString
  }
}

const generateIntegerField = (field, inArray) => {
  if (inArray) {
    return GraphQLInt
  }

  return {
    type: GraphQLInt
  }
}

const generateFloatField = (field, inArray) => {
  if (inArray) {
    return GraphQLFloat
  }

  return {
    type: GraphQLFloat
  }
}

const generateBooleanField = (field, inArray) => {
  if (inArray) {
    return GraphQLBoolean
  }

  return {
    type: GraphQLBoolean
  }
}

const generateDateField = (field, inArray) => {
  if (inArray) {
    return GraphQLDateTime
  }

  return {
    type: GraphQLDateTime
  }
}

const generateReferenceField = (fieldKey, field, schemas, types, resolver, inArray) => {

  if (inArray) {
    return types[field.ref].objectType
  }

  let result = {
    type: types[field.ref].objectType
  }

  if (schemas[field.ref].class === 'collection') {
    result.resolve = async (root, args, context) => {
      args = { ...args, _id: root[fieldKey] }
      return await resolver('findOne', field.ref, root, args, context)
    }
  }

  return result
}

const generateArrayField = (fieldKey, field, schemas, types, resolver) => {
  let result = {
    type: new GraphQLList(generateField(fieldKey, field.item, schemas, types, resolver, true))
  }

  if ((field.item.type === 'reference' || field.item.type === 'association') && schemas[field.item.ref].class === 'collection') {
    result.resolve = async (root, args, context) => {
      args = { ...args, _id: { $in: root[fieldKey] } }
      return await resolver('find', field.ref, root, args, context)
    }
  }

  return result
}

