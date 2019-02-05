const mongoose = require('mongoose')
const {Schema} = require('mongoose')

const manufacturerSchema = new Schema({
    name: {
        type: String,
        required: true,
        index: {unique: true}
    },
    origin: {
        type: String,
        required: true
    },
    founded: {
        type: Number
    }
}, {
    timestamps: true,
})

manufacturerSchema.methods = {
    view(full) {
        const view = {
            // simple view
            id: this._id,
            name: this.name
        }

        return full ? {
            ...view,
            origin: this.origin,
            founded: this.founded,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        } : view
    }
}

const model = mongoose.model('Manufacturer', manufacturerSchema)

module.exports = {model, manufacturerSchema}

