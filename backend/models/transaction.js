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
    return this.find({}).sort({blockHeight: -1}).skip(20 * (page-1)).limit(20);
}

transactionSchema.statics.findTransaction = function (id) {
    return this.findOne({id: {$eq: id}});
}

transactionSchema.statics.getCount = function () {
    return this.count({});
}

transactionSchema.statics.findByAddress = function (address, page) {
    return this.find({$or: [{senderAddress: {$eq: address}}, {recipientAddress: {$eq:address}}]}).sort({height: -1}).skip(20 * (page - 1)).limit(20);
}

transactionSchema.statics.getCountByAddress = function (address) {
    return this.count({$or: [{senderAddress: {$eq: address}}, {recipientAddress: {$eq:address}}]});
}
transactionSchema.statics.getTransactionOutByAddress = function (address) {
    return this.count({senderAddress: {$eq: address}});
}
transactionSchema.statics.getTransactionInByAddress = function (address) {
    return this.count({recipientAddress: {$eq: address}});
}
module.exports = mongoose.model('Transaction', transactionSchema);
