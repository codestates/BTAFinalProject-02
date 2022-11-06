const mongoose = require('mongoose');

const blockSchema = new mongoose.Schema({
        version: {type: Number, required: true},
        timestamp: {type: Number, required: true},
        height: {type: Number, required: true},
        previousBlockID: {type: String, required: true},
        transactionRoot: {type: String, required: true},
        generatorPublicKey: {type: String, required: true},
        reward: {type: String, required: true},
        signature: {type: String, required: true},
        id: {type: String, required: true},
        maxHeightPreviouslyForged: {type: Number, required: true},
        maxHeightPrevoted: {type: Number, required: true},
        seedReveal: {type: String, required: true},
        payload: {type: [], required: true},
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
    return block.height
};

module.exports = mongoose.model('Block', blockSchema);
