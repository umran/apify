const expect = require('chai').expect
const generateSchema = require('../src/generateMongooseSchema')
const data = require('./data')

describe('generateMongooseSchema()', () => {
  it('should take a schema configuration and return a valid mongoose schema', () => {

    // 1. ARRANGE
    const schemaConfig = data.schemaConfig
    const expectedMongooseSchema = data.expectedMongooseSchema

    // 2. ACT
    const generatedMongooseSchema = generateMongooseSchema(schemaConfig)

    // 3. ASSERT
    expect(generatedMongooseSchema).to.deep.equal(expectedMongooseSchema)

  })
})
