const mongoose = require('mongoose');

const blockSchema = new mongoose.Schema({
        version: {type: Number, required: true},
        timestamp: {type: Number, required: true},
        height: {type: Number, required: true, index: true},
        previousBlockID: {type: String, required: true},
        transactionRoot: {type: String, required: true},
        generatorPublicKey: {type: String, required: true},
        reward: {type: String, required: true},
        signature: {type: String, required: true},
        id: {type: String, required: true, unique: true},
        maxHeightPreviouslyForged: {type: Number, required: true},
        maxHeightPrevoted: {type: Number, required: true},
        seedReveal: {type: String, required: true},
        payload: {type: [String], required: true},
    },
    {
        timestamps: true
    }
)

blockSchema.statics.getList = function (page) {
    return this.find({}).sort({height: -1}).skip(20 * page).limit(20);
}

blockSchema.statics.findBlockByID = function (id) {
    return this.findOne({id: {$eq: id}});
}

blockSchema.statics.findBlockByHeight = function (height) {
    return this.findOne({height: {$eq: height}});
}

blockSchema.statics.getCount = function(){
    return this.count({});
}

module.exports = mongoose.model('Block', blockSchema);
