const processReference = (ref, path, schemas, generatedPopulations, pendingPopulations) => {
  if (schemas[ref].class === 'embedded') {
    Object.keys(schemas[ref].fields).forEach(fieldKey => {
      if (schemas[ref].fields[fieldKey].type === 'reference') {
        processReference(schemas[ref].fields[fieldKey].ref, `${path}.${fieldKey}`, schemas, generatedPopulations, pendingPopulations)
      } else if (schemas[ref].fields[fieldKey].type === 'array' && schemas[ref].fields[fieldKey].item.type === 'reference') {
        processReference(schemas[ref].fields[fieldKey].item.ref, `${path}.${fieldKey}`, schemas, generatedPopulations, pendingPopulations)
      }
    })
  } else {
    let population = {
      path,
      model: ref,
      select: Object.keys(schemas[ref].fields).reduce((accumulator, fKey) => {
        if (!(schemas[ref].fields[fKey].type === 'reference' && schemas[ref].fields[fKey].ref === ref)
          && !(schemas[ref].fields[fKey].type === 'array' && schemas[ref].fields[fKey].item.type === 'reference' && schemas[ref].fields[fKey].item.ref === ref)
        ) {
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
    } else if (schema.fields[fieldKey].type === 'array' && schema.fields[fieldKey].item.type === 'reference' && schemaKey !== schema.fields[fieldKey].item.ref) {
      processReference(schema.fields[fieldKey].item.ref, fieldKey, schemas, generatedPopulations, pendingPopulations)
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
