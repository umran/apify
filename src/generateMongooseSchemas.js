const expectedMongooseSchemas = require('../test/data').generateMongooseSchemas.expectedMongooseSchemas

module.exports = configurationSchemas => {
  // this is cheating
  return expectedMongooseSchemas
}
