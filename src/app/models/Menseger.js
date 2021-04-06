const mongoose = require('../../database');

const MensegerSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    menseger: {
        type: String,
        required: true
    },
    edited: {
        type: Boolean,
        default: false
    },
    createAt: {
        type: Date,
        default: Date.now
    }
})

const Menseger = mongoose.model('Menseger', MensegerSchema);

module.exports = Menseger;