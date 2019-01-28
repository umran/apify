const configurationSchemas = require('./configurationSchemas')

// expected mongoose schemas
const Contact = {
  properties: {
    phone: {
      type: 'integer',
      index: true
    },
    email: {
      type: 'keyword',
      index: true
    }
  }
}

const Person = {
  properties: {
    name: {
      type: 'text',
      index: true
    },
    contact: {
      type: 'object',
      enabled: true,
      properties: Contact.properties
    }
  }
}

const Address = {
  properties: {
    line_1: {
      type: 'text',
      index: true
    },
    line_2: {
      type: 'text',
      index: true
    },
    city: {
      type: 'text',
      index: true
    },
    postal_code: {
      type: 'keyword',
      index: true
    },
    province: {
      type: 'text',
      index: true
    }
  }
}

const Parent = {
  properties: {
    // string field
    name: {
      type: 'text',
      index: true
    },

    // string array field
    tags: {
      type: 'keyword',
      index: true
    },

    // integer or float field
    age: {
      type: 'integer',
      index: true
    },

    // integer or float array field
    favourite_numbers: {
      type: 'float',
      index: true
    },

    // boolean field
    isAmerican: {
      type: 'boolean',
      index: true
    },

    // boolean array field
    answers: {
      type: 'boolean',
      index: true
    },

    // date field
    start: {
      type: 'date',
      index: true
    },

    end: {
      type: 'date',
      index: true
    },

    // date array field
    starts: {
      type: 'date',
      index: true
    },

    // collection reference field
    spouse: {
      type: 'object',
      enabled: true,
      properties: Person.properties
    },

    // collection reference array field
    friends: {
      type: 'nested',
      properties: Person.properties
    },

    // embedded reference fields
    contact: {
      type: 'object',
      enabled: true,
      properties: Contact.properties
    },

    otherContact: {
      type: 'object',
      enabled: true,
      properties: Contact.properties
    },

    // embedded reference array field
    addresses: {
      type: 'nested',
      properties: Address.properties
    }
  }
}

module.exports = {
  expectedElasticMappings: {
    Person,
    Contact,
    Address,
    Parent
  },
  configurationSchemas
}
