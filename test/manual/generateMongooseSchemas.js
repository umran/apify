const generateMongooseSchemas = require('../../src/generateMongooseSchemas')
const configurationSchemas = require('../data/configurationSchemas')

const mongooseSchemas = generateMongooseSchemas(configurationSchemas)
console.log(mongooseSchemas.generatedSchemaContents)
