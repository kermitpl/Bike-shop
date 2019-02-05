const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const transactionSchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    model: {
        type: Schema.ObjectId,
        ref: 'Bikemodel',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    paymentType: {
        type: String
    }
}, {
    timestamps: true,
})

transactionSchema.methods = {
    view (full) {
        const view = {
            // simple view
            id: this._id,
            user: this.user,
            model: this.model,
            createdAt: this.createdAt
        }

        return full ? {
            ...view,
            quantity: this.quantity,
            paymentType: this.paymentType,
            updatedAt: this.updatedAt
        } : view
    }
}

const model = mongoose.model('Transaction', transactionSchema)

module.exports = {model, transactionSchema: transactionSchema}