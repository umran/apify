module.exports = async (model, args) => {
  let document = await model.create(args)

  return document._id.toString()
}
