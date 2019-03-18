module.exports = async (model, args) => {
  const { _id } = args

  let document = await model.findOneAndDelete({ _id })

  return _id
}
