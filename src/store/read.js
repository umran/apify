const find = require('./find')
const findOne = require('./findOne')

module.exports = (models, cache) => {
  find: async (modelKey, args, options) => {
    let results

    if (cache) {
    	results = await cache.get({modelKey, args, options})
    }

  	if (!results) {
  	  results = await find(models[modelKey], args, options)
  	  if (results.length > 0) {
  	  	await cache.set({modelKey, args, options}, results)
  	  }
  	}

  	return results
  },

  findOne: async (modelKey, args) => {
    let results

    if (cache) {
    	results = await cache.get({modelKey, args})
    }

  	if (!results) {
  	  results = await findOne(models[modelKey], args)
  	  if (results.length > 0) {
  	  	await cache.set({modelKey, args}, results)
  	  }
  	}

  	return results
  }
}
