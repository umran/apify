const processReference = (ref, path, schemas, generatedPopulations, pendingPopulations) => {
  if (schemas[ref].class === 'embedded') {
    Object.keys(schemas[ref].fields).forEach(fieldKey => {
      if (schemas[ref].fields[fieldKey].type === 'reference' && ref !== schemas[ref].fields[fieldKey].ref) {
        processReference(schemas[ref].fields[fieldKey].ref, `${path}.${fieldKey}`, schemas, generatedPopulations, pendingPopulations)
      }
    })
  } else {
    let population = {
      path,
      model: ref,
      select: Object.keys(schemas[ref].fields).reduce((accumulator, fKey) => {
        if (!(schemas[ref].fields[fKey].type === 'reference' && schemas[ref].fields[fKey].ref === ref)) {
          accumulator[fKey] = 1
        }

        return accumulator
      }, {})
    }

    if (generatedPopulations[ref]().length > 0) {
      population.populate = generatedPopulations[ref]()
    }

    pendingPopulations.push(population)
  }
}

const generatePopulations = (schemaKey, schema, schemas, generatedPopulations) => {
  return Object.keys(schema.fields).reduce((pendingPopulations, fieldKey) => {
    if (schema.fields[fieldKey].type === 'reference' && schemaKey !== schema.fields[fieldKey].ref) {
      processReference(schema.fields[fieldKey].ref, fieldKey, schemas, generatedPopulations, pendingPopulations)
    }

    return pendingPopulations
  }, [])
}

module.exports = schemas => {
  return Object.keys(schemas).reduce((accumulator, schemaKey) => {

    if (schemas[schemaKey].class === 'collection') {
      accumulator[schemaKey] = () => generatePopulations(schemaKey, schemas[schemaKey], schemas, accumulator)
    }

    return accumulator
  }, {})
}
