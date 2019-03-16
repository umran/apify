// configuration schemas
const Dummy = {
  class: "embedded",
  fields: {
    person: {
      type: "reference",
      required: false,
      ref: "Person",
      es_indexed: true
    },
    version: {
      type: "float",
      required: true,
      es_indexed: true
    },
    date: {
      type: "date",
      required: true,
      es_indexed: true
    },
    residential: {
      type: "boolean",
      required: true,
      es_indexed: true
    }
  }
}

const DummyRequired = {
  class: "embedded",
  fields: {
    contact: {
      type: "reference",
      required: true,
      ref: "Contact",
      es_indexed: true
    },
    contacts: {
      type: "array",
      required: true,
      item: {
        type: "reference",
        required: true,
        ref: "Contact",
        es_indexed: true
      }
    },
    persons: {
      type: "array",
      required: true,
      item: {
        type: "reference",
        required: true,
        ref: "Person",
        es_indexed: true
      }
    },
    emails: {
      type: "array",
      required: true,
      item: {
        type: "string",
        required: true,
        es_indexed: true,
        es_keyword: true
      }
    },
    phones: {
      type: "array",
      required: true,
      item: {
        type: "integer",
        required: false,
        es_indexed: true
      }
    },
    versions: {
      type: "array",
      required: false,
      item: {
        type: "float",
        required: false,
        es_indexed: true
      }
    },
    dates: {
      type: "array",
      required: true,
      item: {
        type: "date",
        required: false,
        es_indexed: true
      }
    },
    residentials: {
      type: "array",
      required: true,
      item: {
        type: "boolean",
        required: false,
        es_indexed: true
      }
    }
  }
}

const Contact = {
  class: "embedded",
  fields: {
    phone: {
      type: "integer",
      required: true,
      es_indexed: true
    },
    email: {
      type: "string",
      required: true,
      es_indexed: true,
      es_keyword: true
    },
    phone_secondary: {
      type: "integer",
      required: false,
      es_indexed: true
    },
    email_secondary: {
      type: "string",
      required: false,
      es_indexed: true,
      es_keyword: true
    },
    version: {
      type: "float",
      required: false,
      es_indexed: true
    },
    date_added: {
      type: "date",
      required: false,
      es_indexed: true
    },
    residential: {
      type: "boolean",
      required: false,
      es_indexed: true
    }
  }
}

const Person = {
  class: "collection",
  fields: {
    name: {
      type: "string",
      required: true,
      es_indexed: true,
      es_keyword: false
    },
    name_secondary: {
      type: "string",
      required: false,
      es_indexed: true,
      es_keyword: false
    },
    clearance: {
      type: "integer",
      required: false,
      es_indexed: true
    },
    temperature: {
      type: "float",
      required: false,
      es_indexed: true
    },
    contractor: {
      type: "boolean",
      required: false,
      es_indexed: true
    },
    conscription_date: {
      type: "date",
      required: false,
      es_indexed: true
    },
    contact: {
      type: "reference",
      required: true,
      ref: "Contact",
      es_indexed: true
    },
    contact_secondary: {
      type: "reference",
      required: false,
      ref: "Contact",
      es_indexed: true
    },
    alias_of: {
      type: "reference",
      required: false,
      ref: "Person",
      es_indexed: false
    },
    doctors: {
      type: "array",
      required: true,
      item: {
        type: "reference",
        required: false,
        ref: "Person",
        es_indexed: false
      }
    }
  }
}

const Address = {
  class: "embedded",
  fields: {
    line_1: {
      type: "string",
      required: true,
      es_indexed: true,
      es_keyword: false
    },
    line_2: {
      type: "string",
      required: false,
      es_indexed: true,
      es_keyword: false
    },
    city: {
      type: "string",
      required: true,
      es_indexed: true,
      es_keyword: false,
      enum: ["Vancouver", "Abbotsford"]
    },
    postal_code: {
      type: "string",
      required: true,
      es_indexed: true,
      es_keyword: true
    },
    province: {
      type: "string",
      required: true,
      es_indexed: true,
      es_keyword: false,
      default: "BC"
    }
  }
}

const Parent = {
  class: "collection",
  fields: {
    dummy: {
      type: "reference",
      required: true,
      ref: "Dummy",
      es_indexed: true
    },
    dummy_required: {
      type: "reference",
      required: true,
      ref: "DummyRequired",
      es_indexed: true
    },
    name: {
      type: "string",
      required: true,
      es_indexed: true,
      es_keyword: false
    },
    tags: {
      type: "array",
      required: false,
      item: {
        type: "string",
        // the required flag in the item object is ignored by mongoose, but is useful for graphql
        required: true,
        es_indexed: true,
        es_keyword: true
      }
    },
    age: {
      type: "integer",
      required: true,
      es_indexed: true,
      enum: [65, 40]
    },
    favourite_ages: {
      type: "array",
      required: true,
      item: {
        type: "integer",
        // the required flag in the item object is ignored by mongoose, but is useful for graphql
        required: true,
        es_indexed: true
      }
    },
    number: {
      type: "float",
      required: true,
      es_indexed: true,
    },
    favourite_numbers: {
      type: "array",
      required: true,
      item: {
        type: "float",
        // the required flag in the item object is ignored by mongoose, but is useful for graphql
        required: true,
        es_indexed: true,
        default: 0
      }
    },
    isAmerican: {
      type: "boolean",
      required: true,
      es_indexed: true,
      default: true
    },
    answers: {
      type: "array",
      required: false,
      item: {
        type: "boolean",
        // the required flag in the item object is ignored by mongoose, but is useful for graphql
        required: true,
        es_indexed: true
      }
    },
    start: {
      type: "date",
      required: true,
      es_indexed: true,
      default: 'current_date'
    },
    end: {
      type: "date",
      required: true,
      es_indexed: true,
      default: '2019-08-28T07:15:19+0000'
    },
    starts: {
      type: "array",
      required: true,
      item: {
        type: "date",
        // the required flag in the item object is ignored by mongoose, but is useful for graphql
        required: true,
        es_indexed: true
      }
    },
    spouse: {
      type: "reference",
      required: false,
      ref: "Person",
      // for the reference and array types, the es_indexed field determines whether the underlying object should be indexed according to the index and anlyzer options specified in the object
      es_indexed: true
    },
    friends: {
      type: "array",
      required: true,
      item: {
        type: "reference",
        // the required flag in the item object is ignored by mongoose, but is useful for graphql
        required: true,
        ref: "Person",
        // for the reference and array types, the es_indexed field determines whether the underlying object should be indexed according to the index and anlyzer options specified in the object
        es_indexed: true
      }
    },
    contact: {
      type: "reference",
      required: true,
      ref: "Contact",
      // for the reference and array types, the es_indexed field determines whether the underlying object should be indexed according to the index and anlyzer options specified in the object
      es_indexed: true
    },
    // a second reference to the same schema is added here to cover additional branches during testing
    otherContact: {
      type: "reference",
      required: true,
      ref: "Contact",
      // for the reference and array types, the es_indexed field determines whether the underlying object should be indexed according to the index and anlyzer options specified in the object
      es_indexed: true
    },
    addresses: {
      type: "array",
      required: true,
      item: {
        type: "reference",
        // the required flag in the item object is ignored by mongoose, but is useful for graphql
        required: true,
        ref: "Address",
        // for the reference and array types, the es_indexed field determines whether the underlying object should be indexed according to the index and anlyzer options specified in the object
        es_indexed: true
      }
    }
  }
}

module.exports = {
  Dummy,
  DummyRequired,
  Person,
  Contact,
  Address,
  Parent
}
