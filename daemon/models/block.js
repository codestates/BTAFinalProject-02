const mongoose = require('mongoose');

const blockSchema = new mongoose.Schema({
        version: {type: Number, required: true},
        timestamp: {type: Number, required: true},
        height: {type: Number, required: true, index:true},
        previousBlockID: {type: String, required: false},
        transactionRoot: {type: String, required: true},
        generatorPublicKey: {type: String, required: false},
        generatorAddress: {type: String, required: false},
        reward: {type: String, required: true},
        signature: {type: String, required: false},
        id: {type: String, required: true, unique: true},
        maxHeightPreviouslyForged: {type: Number, required: false},
        maxHeightPrevoted: {type: Number, required: false},
        seedReveal: {type: String, required: false},
        payload: {type: [String], required: true},
    },
    {
        timestamps: true
    }
)

blockSchema.statics.create = function (payload) {
    const block = new this(payload);
    return block.save();
};

blockSchema.statics.getLastStoredBlockHeight = async function () {
    const block = await this.findOne({}).sort({"height": -1});

    return block ? block.height : -1
};

module.exports = mongoose.model('Block', blockSchema);
