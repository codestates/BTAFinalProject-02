const {apiClient} = require('@liskhq/lisk-client');

let clientCache;

module.exports.getClient = async () => {
    if (!clientCache) {
        clientCache = await apiClient.createWSClient("ws://34.125.144.144:9000/ws");
    }
    return clientCache;
};

module.exports.getLastBlock = async () => {
    const client = await this.getClient();
    const nodeInfo = await client.node.getNodeInfo()
    return {lastBlockId: nodeInfo.lastBlockID, lastBlockHeight: nodeInfo.height}
};

module.exports.subscribeBlocks = async (callBack) => {
    const client = await this.getClient();
    client.subscribe("app:block:new", callBack)
}

module.exports.decodeBlock = async (encodedBlock) => {
    const client = await this.getClient();
    return client.block.decode(encodedBlock)
}

module.exports.decodeAccount = async (encodedAcocunt) => {
    const client = await this.getClient();
    return client.account.decode(encodedAcocunt)
}

module.exports.getBlockByHeight = async (height) => {
    const client = await this.getClient();
    return client.block.getByHeight(height)
}
