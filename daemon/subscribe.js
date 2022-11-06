const {getLastBlock, subscribeBlocks, decodeBlock, decodeAccount, getBlockByHeight} = require("./utils/apiClient");
require('dotenv').config();
const mongoose = require('mongoose');
const {MONGO_URI, RPC_URI} = process.env;
const {Block, Transaction} = require('./models')


mongoose
    .connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(async () => {
        subscribeBlocks(async (data) => {
            const decodedBlock = await decodeBlock(data.block)
            const blockData = reStructBlockData(decodedBlock)
            decodedBlock.payload.map(payload => {
                Transaction.create(reStructTransactionData(payload, decodedBlock))
            })
            Block.create(blockData)
        })
        const lastStoredBlockHeight = await Block.getLastStoredBlockHeight()
        const {lastBlockHeight} = await getLastBlock()
        for (let i = lastStoredBlockHeight + 1; i < lastBlockHeight; i++) {
            getBlockByHeight(i).then((block) => {
                block.payload.map(payload => {
                    Transaction.create(reStructTransactionData(payload, block))
                })
                Block.create(reStructBlockData(block))
            })
        }
    })
    .catch(e => console.error(e));


function reStructBlockData(decodedBlock) {
    let blockData = {}
    Object.assign(blockData, decodedBlock.header)
    Object.assign(blockData, decodedBlock.header.asset)
    delete blockData.asset
    blockData.previousBlockID = blockData.previousBlockID.toString("hex")
    blockData.transactionRoot = blockData.transactionRoot.toString("hex")
    blockData.generatorPublicKey = blockData.generatorPublicKey.toString("hex")
    blockData.signature = blockData.signature.toString("hex")
    blockData.id = blockData.id.toString("hex")
    blockData.seedReveal = blockData.seedReveal.toString("hex")
    blockData.payload = decodedBlock.payload.map(payload => {
        return payload.id.toString("hex")
    })
    console.log(blockData)
    return blockData
}

function reStructTransactionData(transaction, block) {
    let transactionData = {}
    Object.assign(transactionData, transaction)
    Object.assign(transactionData, transaction.asset)
    delete transactionData.asset
    transactionData.senderPublicKey = transactionData.senderPublicKey.toString("hex")
    transactionData.recipientAddress = transactionData.recipientAddress.toString("hex")
    transactionData.id = transactionData.id.toString("hex")
    transactionData.signatures = transactionData.signatures.map(signature => {
        return signature.toString("hex")
    })
    transactionData.blockID = block.header.id.toString("hex")
    transactionData.blockHeight = block.header.height
    console.log(transactionData)
    return transactionData
}
