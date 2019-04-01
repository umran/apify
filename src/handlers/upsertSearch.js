module.exports = async (modelKey, model, populations, projections, _id) => {
  let doc

  if (populations[modelKey]) {
    doc = await model.findOne({ _id }, { ...projections[modelKey], _id: 0 }).populate(populations[modelKey]).lean()
  } else {
    doc = await model.findOne({ _id }, { ...projections[modelKey], _id: 0 }).lean()
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
