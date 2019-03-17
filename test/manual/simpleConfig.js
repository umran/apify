module.exports = {
  Person: {
    class: 'collection',
    fields: {
      first_name: {
        type: 'string',
        required: false,
        es_indexed: true,
        es_keyword: false
      },
      last_name: {
        type: 'string',
        required: false,
        es_indexed: true,
        es_keyword: false
      },
      address: {
        type: 'reference',
        ref: 'Address',
        es_indexed: true,
        required: false
      },
      contact: {
        type: 'reference',
        ref: 'Address',
        es_indexed: true,
        required: true
      }
    }
  },
  Contact: {
    class: 'embedded',
    fields: {
      email: {
        type: 'string',
        required: true,
        es_indexed: true,
        es_keyword: true
      },
      phone: {
        type: 'integer',
        required: false,
        es_indexed: true
      }
    }
  },
  Address: {
    class: 'collection',
    fields: {
      line_1: {
        type: 'string',
        required: true,
        es_indexed: true,
        es_keyword: true
      },
      line_2: {
        type: 'string',
        required: false,
        es_indexed: true,
        es_keyword: true
      },
      city: {
        type: 'string',
        required: true,
        es_indexed: true,
        es_keyword: true
      },
      postal_code: {
        type: 'string',
        required: true,
        es_indexed: true,
        es_keyword: true
      }
    }
  }
}
