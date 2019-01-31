const generateMongooseSchemas = require('../../src/generateMongooseSchemas_refactored')
const configurationSchemas = require('../data/configurationSchemas')

const mongooseSchemas = generateMongooseSchemas(configurationSchemas)
console.log(mongooseSchemas.Address())
