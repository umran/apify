class GenericError extends Error {
  constructor(code, message) {
    super()
    this.message = `${code}: ${message}`
  }
}

class SchemaError extends GenericError {}

module.exports = {
  GenericError,
  SchemaError
}
