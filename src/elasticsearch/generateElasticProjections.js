module.exports = schemas => {
  return Object.keys(schemas).reduce((accumulator, schemaKey) => {
    if (schemas[schemaKey].class === 'collection') {
      accumulator[schemaKey] = generateProjections(schemaKey, schemas)
    }

    return accumulator
  }, {})
}

const generateProjections = (schemaKey, schemas) => {
  return Object.keys(schemas[schemaKey].fields).reduce((accumulator, fKey) => {
    if (!(schemas[schemaKey].fields[fKey].type === 'reference' && schemas[schemaKey].fields[fKey].ref === schemaKey)
      && !(schemas[schemaKey].fields[fKey].type === 'array' && schemas[schemaKey].fields[fKey].item.type === 'reference' && schemas[schemaKey].fields[fKey].item.ref === schemaKey)
    ) {
      accumulator[fKey] = 1
    }

    return accumulator
  }, {})
}
