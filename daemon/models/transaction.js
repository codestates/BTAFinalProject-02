const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    moduleID: {type: Number, required: true},
    assetID: {type: Number, required: true},
    nonce: {type: String, required: true},
    fee: {type: String, required: true},
    senderPublicKey: {type: String, required: true},
    senderAddress: {type: String, required: true},
    amount: {type: String, required: true},
    recipientAddress: {type: String, required: true},
    data: {type: String, required: true},
    signatures: {type: [String], required: true},
    id: {type: String, required: true, unique: true},
    blockID: {type: String, required: true, index: true},
    blockHeight: {type: Number, required: true, index: true},
    timestamp: {type: Number, required: true}
}, {timestamps: true})

transactionSchema.statics.create = function (payload) {
    const transaction = new this(payload);
    return transaction.save();
};


module.exports = mongoose.model('Transaction', transactionSchema);
