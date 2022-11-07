const router = require('express').Router()
const Block = require('../models/block')
const Transaction = require('../models/transaction')
const {apiClient, cryptography} = require('@liskhq/lisk-client')

let clientCache;
const {NODE_RPC_URI} = process.env;
apiClient.createWSClient(NODE_RPC_URI).then(client => {
    clientCache = client;
});

router.get("/:address", (req, res) => {
    const address = req.params['address'];
    let binaryAddress = address;
    if (address.length === 64) {
        binaryAddress = cryptography.getAddressFromPublicKey(cryptography.hexToBuffer(address)).toString("hex");
    } else if (address.length === 41 && address.startsWith("lsk")) {
        binaryAddress = cryptography.getAddressFromLisk32Address(address);
    }

    clientCache.account.get(binaryAddress).then(account => {
        account = reStructAccount(account);
        res.send(account);
    })
})

router.get("/:address/transactions/:page?", (req, res) => {
    let address = req.params['address'];
    let binaryAddress = address;
    const page = req.params['page'];

    if (address.length === 41) {
        binaryAddress = cryptography.getAddressFromLisk32Address(cryptography.hexToBuffer(address))
    } else if (address.length === 64) {
        binaryAddress = cryptography.getAddressFromPublicKey(cryptography.hexToBuffer(address))
    }

    Transaction.findByAddress(binaryAddress, page).then(list => {
        Transaction.getCountByAddress(binaryAddress).then(count => {
            res.send({transactions: list, count: count})
        })
    })
})

const reStructAccount = (account) => {
    account.address = account.address.toString("hex");
    account.token.balance = account.token.balance.toString();
    account.sequence.nonce = account.sequence.nonce.toString();
    account.dpos.delegate.totalVotesReceived = account.dpos.delegate.totalVotesReceived.toString();
    account.dpos.sentVotes = account.dpos.sentVotes.map(vote => {
        vote.amount = vote.amount.toString();
        vote.delegateAddress = vote.delegateAddress.toString("hex")
        return vote
    })
    return account
}

module.exports = router;
