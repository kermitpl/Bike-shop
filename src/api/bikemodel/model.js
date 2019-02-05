const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const bikemodelSchema = new Schema({
  manufacturer: {
      type: Schema.ObjectId,
      ref: 'Manufacturer',
      required: true
  },
  model: {
    type: String,
      required: true
  },
  year: {
    type: Number
  },
  size: {
    type: Number
  }
}, {
  timestamps: true,
})

bikemodelSchema.methods = {
  view (full) {
      const view = {
          // simple view
          id: this._id,
          manufacturer: this.manufacturer,
          model: this.model,
          year: this.year
      }

      return full ? {
          ...view,
          size: this.size,
          createdAt: this.createdAt,
          updatedAt: this.updatedAt
      } : view
  }
}

const model = mongoose.model('Bikemodel', bikemodelSchema)

module.exports = {model, bikemodelSchema: bikemodelSchema}
