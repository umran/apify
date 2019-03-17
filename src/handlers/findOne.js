const { formatResult } = require('./handlerUtils')

module.exports = async (model, args) => {
  return formatResult(await model.findOne(args).lean())
}
