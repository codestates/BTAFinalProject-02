const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    moduleID: {type: Number, required: true},
    assetID: {type: Number, required: true},
    nonce: {type: String, required: true},
    fee: {type: String, required: true},
    senderPublicKey: {type: String, required: true},
    amount: {type: String, required: true},
    recipientAddress: {type: String, required: true},
    data: {type: String, required: true},
    signatures: {type: [String], required: true},
    id: {type: String, required: true, unique: true},
    blockID: {type: String, required: true, index: true},
    blockHeight: {type: Number, required: true, index: true}
}, {timestamps: true})

transactionSchema.statics.getList = function (page) {
    return this.find({}).sort({blockHeight: -1}).skip(20 * page).limit(20);
}

transactionSchema.statics.findTransaction = function (id) {
    return this.findOne({id: {$eq: id}});
}
module.exports = mongoose.model('Transaction', transactionSchema);
