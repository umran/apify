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
    },
    phone_secondary: {
      type: 'integer',
      index: true
    },
    email_secondary: {
      type: 'keyword',
      index: true
    },
    version: {
      type: 'float',
      index: true
    },
    date_added: {
      type: 'date',
      index: true
    },
    residential: {
      type: 'boolean',
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
    name_secondary: {
      type: 'text',
      index: true
    },
    clearance: {
      type: 'integer',
      index: true
    },
    temperature: {
      type: 'float',
      index: true
    },
    contractor: {
      type: 'boolean',
      index: true
    },
    conscription_date: {
      type: 'date',
      index: true
    },
    contact: {
      type: 'object',
      enabled: true,
      properties: Contact.properties
    },
    contact_secondary: {
      type: 'object',
      enabled: true,
      properties: Contact.properties
    }
  }
}

const DummyRequired = {
  properties: {
    contacts: {
      type: 'nested',
      properties: Contact.properties
    },
    persons: {
      type: 'nested',
      properties: Person.properties
    },
    emails: {
      type: 'keyword',
      index: true
    },
    phones: {
      type: 'integer',
      index: true
    },
    versions: {
      type: 'float',
      index: true
    },
    dates: {
      type: 'date',
      index: true
    },
    residentials: {
      type: 'boolean',
      index: true
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
    // dummy references field
    dummy_required: {
      type: 'object',
      enabled: true,
      properties: DummyRequired.properties
    },

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

    // integer and integer array fields
    age: {
      type: 'integer',
      index: true
    },

    favourite_ages: {
      type: 'integer',
      index: true
    },

    // float and float array fields
    number: {
      type: 'float',
      index: true
    },

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
    DummyRequired,
    Person,
    Contact,
    Address,
    Parent
  },
  configurationSchemas
}
