const config = require('../data/configurationSchemas.js')
const generateProjections = require('../../src/elasticsearch/generateProjections.js')

let projections = generateProjections(config)

console.log(projections)
