const formatResult = require('./formatResult')

module.exports = async (model, args) => {
  return formatResult(await model.findOne(args).lean())
}