module.exports = (result) => {
  if (Array.isArray(result)) {
    return result.map(res => {
      res._id = res._id.toString()
      return res
    })
  }

  result._id = result._id.toString()
}
