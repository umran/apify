const expect = require('chai').expect
const generateElasticProjections = require('../src/elasticsearch').generateElasticProjections

const schemas = {
  person: {
    class: 'collection',
    fields: {
      name: {
        type: 'string',
        required: true,
        es_indexed: true,
        es_keyword: false
      },
      contact: {
        type: 'reference',
        ref: 'contact',
        required: true,
        es_indexed: true
      },
      address: {
        type: 'reference',
        ref: 'address',
        required: false,
        es_indexed: true
      },
      spouse: {
        type: 'reference',
        ref: 'person',
        required: false,
        es_indexed: true
      },
      aliases: {
        type: 'array',
        required: false,
        item: {
          type: 'reference',
          required: false,
          ref: 'person',
          es_indexed: true
        }
      }
    }
  },
  address: {
    class: 'collection',
    fields: {
      line_1: {
        type: 'string',
        required: true,
        es_indexed: true,
        es_keyword: true
      }
    }
  },
  contact: {
    class: 'embedded',
    fields: {
      email: {
        type: 'string',
        required: true,
        es_indexed: true,
        es_keyword: true
      }
    }
  }
}

describe('generateElasticProjections', () => {
  it('should generate all collection documents, projecting all fields except self referential fields', () => {
    let projections = generateElasticProjections(schemas)

    expect(projections).to.deep.equal({
      person: {
        name: 1,
        contact: 1,
        address: 1
      },
      address: {
        line_1: 1
      }
    })
  })
})
