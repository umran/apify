module.exports = async (modelKey, model, projection, population, _id, client) => {
  let doc

  if (population.length > 0) {
    doc = await model.findOne({ _id }, { ...projection, _id: 0 }).populate(population).lean()
  } else {
    doc = await model.findOne({ _id }, { ...projection, _id: 0 }).lean()
  }

  await client.update({
    index: modelKey,
    type: modelKey,
    id: _id,
    body: {
      doc,
      doc_as_upsert: true
    }
  })
}
