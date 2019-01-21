const expect = require('chai').expect
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Nested1 = new Schema({
  soma: { type: String, required: true }
})

const Nested2 = new Schema({
  soma: { type: String, required: true }
})

const Schema1 = new Schema({
  test: {
    type: [{ type: Number, required: true }],
    required: true
  },
  arrayRef: {
    type: [{ type: Schema.Types.ObjectId, required: true, ref: 'hulhumale' }]
  },
  nested: {
    type: Nested1,
    required: true
  }
})

const Schema2 = new Schema({
  test: {
    type: [{ type: Number, required: true }],
    required: true
  },
  arrayRef: {
    type: [{ type: Schema.Types.ObjectId, required: true, ref: 'hulhumale' }]
  },
  nested: {
    type: Nested2,
    required: true
  }
})

//expect(Schema1.tree).to.deep.equal(Schema2.tree)

console.log(Schema2)
