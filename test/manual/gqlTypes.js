const generateGraphqlTypes = require('../../src/generateGraphqlTypes')
const schemas = require('../data/configurationSchemas')

const types = generateGraphqlTypes(schemas, (method, model, root, args, context) => {
	// resolver method goes here
})

const Person = types.Person.objectType()
const Contact = types.Contact.objectType()
const Address = types.Address.objectType()
const Parent = types.Parent.objectType()