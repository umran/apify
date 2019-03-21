const config = require('../data/configurationSchemas.js')
const generatePopulations = require('../../src/elasticsearch/generatePopulations.js')

let populations = generatePopulations(config)

console.log(populations['Parent']())