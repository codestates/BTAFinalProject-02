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
            const blockData = reStructBlockData(decodedBlock, data)
            Block.create(blockData)
            // console.log(data.accounts.map(async (account) => {
            //     console.log(await decodeAccount(account))
            // }))
        })
        const lastStoredBlockHeight = await Block.getLastStoredBlockHeight()
        const {lastBlockHeight} = await getLastBlock()
        for (let i = lastStoredBlockHeight + 1; i < lastBlockHeight; i++) {
            getBlockByHeight(i).then((block) => {
                Block.create(reStructBlockData(block, {accounts: []}))
            })
        }
    })
    .catch(e => console.error(e));
getLastBlock().then(console.log)


function reStructBlockData(decodedBlock, data) {
    let blockData = {}
    Object.assign(blockData, decodedBlock.header)
    Object.assign(blockData, decodedBlock.header.asset)
    delete blockData.asset
    blockData.payload = decodedBlock.payload
    blockData.accounts = data.accounts
    blockData.previousBlockID = blockData.previousBlockID.toString("hex")
    blockData.transactionRoot = blockData.transactionRoot.toString("hex")
    blockData.generatorPublicKey = blockData.generatorPublicKey.toString("hex")
    blockData.signature = blockData.signature.toString("hex")
    blockData.id = blockData.id.toString("hex")
    blockData.seedReveal = blockData.seedReveal.toString("hex")
    console.log(blockData)
    return blockData
}
