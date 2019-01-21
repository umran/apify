const Ajv = require('ajv')

const listenPort = process.env.PORT || 3069

// import type schemas
const arraySchema = require('./src/schemas/types/array.json')
const booleanSchema = require('./src/schemas/types/boolean.json')
const dateSchema = require('./src/schemas/types/date.json')
const floatSchema = require('./src/schemas/types/float.json')
const integerSchema = require('./src/schemas/types/integer.json')
const referenceSchema = require('./src/schemas/types/reference.json')
const stringSchema = require('./src/schemas/types/string.json')

// import root schema
const rootSchema = require('./src/schemas/root.json')

const ajv = new Ajv({ allErrors: true })
const validate = ajv.addSchema([arraySchema, booleanSchema, dateSchema, floatSchema, integerSchema, referenceSchema, stringSchema]).compile(rootSchema)

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const server = express()

server.use(cors())
server.use(bodyParser.json())

server.post('/validate', (req, res) => {
  if(!validate(req.body)) {
    console.log('validation error')
    res.status(400).json({
      status: 'error',
      error: {
        type: 'validation',
        level: 'primary',
        message: validate.errors
      }
    })
    return
  }

  res.json({
    status: 'success'
  })
})

server.listen(listenPort)
