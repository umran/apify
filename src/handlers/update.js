const { filterUpdates } = require('./handlerUtils')

const updateOptions = {
  runValidators: true
}

module.exports = async (model, args) => {
  const { _id } = args
  const updates = filterUpdates(args)

  let document = await model.findOneAndUpdate({ _id }, updates, updateOptions)

  return _id
}
