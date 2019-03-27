const expect = require('chai').expect
const buildBackend = require('../src/buildBackend')
const data = require('./data').buildBackend

const mongoose = require('mongoose')

describe('buildBackend()', () => {
  it('should take valid configuration schemas and return an object containing mongoose models and elasticsearch mappings', () => {

    // cleanup mongoose
    mongoose.models = {}
    mongoose.modelSchemas = {}

    const configurationSchemas = data.configurationSchemas


    const backend = buildBackend(configurationSchemas)


    expect(backend).to.have.own.property('mongoose_models')
    expect(backend).to.have.own.property('elastic_mappings')
    expect(backend).to.have.own.property('elastic_projections')
    expect(backend).to.have.own.property('elastic_populations')

  })

})
