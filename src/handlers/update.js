const { filterUpdates } = require('./handlerUtils')

module.exports = async (model, args) => {
  const { _id } = args
  const updates = filterUpdates(args)

  let document = await model.findOneAndUpdate({ _id }, updates)

  return _id
}
