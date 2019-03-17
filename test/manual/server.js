const express = require('express')
const graphqlHTTP = require('express-graphql')

const docdef = require('./simpleConfig')

const buildGraphql = require('../../src/buildGraphql')
const { find, findOne, create, update, delete: _delete } = require('../../src/handlers')

const createResolver = ({ mongoose_models, elastic_mappings }) =>
  async ({ method, collection, root, args, context }) => {

    const model = mongoose_models[collection]
    const mapping = elastic_mappings[collection]

    switch(method) {
      case 'find':
        return await find(model, args)
      case 'findOne':
        return await findOne(model, args)
      case 'search':
        return await search(mapping, args)
      case 'create':
        return await create(model, args)
      case 'update':
        return await update(model, args)
      case 'delete':
        return await _delete(model, args)
    }
  }

const { graphqlSchema } = buildGraphql(docdef, createResolver)

const app = express()

app.use('/api', graphqlHTTP({
  schema: graphqlSchema,
  graphiql: true
}))

app.listen(3001)
