const expect = require('chai').expect
const generateElasticPopulations = require('../src/elasticsearch').generateElasticPopulations

const schemas = {
  person: {
    class: 'collection',
    fields: {
      name: {
        type: 'string',
        required: true,
        es_indexed: true,
        es_keyword: true
      },
      pokedex: {
        type: 'reference',
        required: true,
        ref: 'pokedex',
        es_indexed: true
      },
      region: {
        type: 'reference',
        required: true,
        ref: 'region',
        es_indexed: true
      },
      visited_regions: {
        type: 'array',
        required: true,
        item: {
          type: 'reference',
          required: true,
          ref: 'region',
          es_indexed: true
        }
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

  pokedex: {
    class: 'embedded',
    fields: {
      serial: {
        type: 'integer',
        required: false,
        es_indexed: true
      },
      pokemon: {
        type: 'array',
        required: true,
        item: {
          type: 'reference',
          required: true,
          ref: 'pokemon',
          es_indexed: true
        }
      },
      model: {
        type: 'reference',
        required: true,
        ref: 'model',
        es_indexed: true
      }
    }
  },

  pokemon: {
    class: 'collection',
    fields: {
      name: {
        type: 'string',
        required: true,
        es_indexed: true,
        es_keyword: true
      },
      region: {
        type: 'reference',
        required: true,
        ref: 'region',
        es_indexed: true
      },
      evolves_to: {
        type: 'reference',
        required: false,
        ref: 'pokemon',
        es_indexed: true
      }
    }
  },

  region: {
    class: 'collection',
    fields: {
      name: {
        type: 'string',
        required: true,
        es_indexed: true,
        es_keyword: true
      }
    }
  },

  model: {
    class: 'collection',
    fields: {
      name: {
        type: 'string',
        required: true,
        es_indexed: true,
        es_keyword: true
      },
      regions: {
        type: 'array',
        required: true,
        item: {
          type: 'reference',
          required: true,
          ref: 'region',
          es_indexed: true
        }
      }
    }
  }
}

describe('generateElasticPopulations', () => {
  it('should list all collection level documents', () => {
    const populations = generateElasticPopulations(schemas)

    expect(populations).to.have.all.keys('person', 'pokemon', 'region', 'model')
  })

  it('should generate populations for all collection level fields', () => {
    const populations = generateElasticPopulations(schemas)

    // person
    expect(populations.person()).to.be.an('array').that.deep.includes({
      path: 'region',
      model: 'region',
      select: {
        name: 1
      }
    })

    // pokemon
    expect(populations.pokemon()).to.be.an('array').that.deep.includes({
      path: 'region',
      model: 'region',
      select: {
        name: 1
      }
    })

    // region
    expect(populations.region()).to.be.empty

    // model
    expect(populations.model()).to.be.an('array').that.deep.includes({
      path: 'regions',
      model: 'region',
      select: {
        name: 1
      }
    })
  })

  it('should generate populations for all array fields whose items are collection level fields', () => {
    const populations = generateElasticPopulations(schemas)

    // person
    expect(populations.person()).to.be.an('array').that.deep.includes({
      path: 'visited_regions',
      model: 'region',
      select: {
        name: 1
      }
    })
  })

  it('should generate nested population paths for fields with collection level references in embedded documents', () => {
    const populations = generateElasticPopulations(schemas)

    // person
    expect(populations.person()).to.be.an('array').that.deep.includes({
      path: 'pokedex.model',
      model: 'model',
      select: {
        name: 1,
        regions: 1
      },
      populate: [{
        path: 'regions',
        model: 'region',
        select: {
          name: 1
        }
      }]
    })
  })

  it('should generate nested population paths for fields with collection level references inside arrays in embedded documents', () => {
    const populations = generateElasticPopulations(schemas)

    // person
    expect(populations.person()).to.be.an('array').that.deep.includes({
      path: 'pokedex.pokemon',
      model: 'pokemon',
      select: {
        name: 1,
        region: 1
      },
      populate: [{
        path: 'region',
        model: 'region',
        select: {
          name: 1
        }
      }]
    })
  })
})
