/*
 * @swagger
 * tags:
 *   name: Accounts
 *   description: account 조회
 */
const router = require("express").Router();
const Block = require("../models/block");
const Transaction = require("../models/transaction");
const { apiClient, cryptography } = require("@liskhq/lisk-client");

let clientCache;
const { NODE_RPC_URI } = process.env;
apiClient.createWSClient(NODE_RPC_URI).then((client) => {
  clientCache = client;
});
/**
 * @swagger
 * paths:
 *  /accounts/{address}:
 *   get:
 *     tags: [Account]
 *     summary: account 조회
 *     parameters:
 *      - in: path
 *        name: address
 *        schema:
 *          type: string
 *        required: true
 *        description: publicKey or binaryAddress or address
 *     responses:
 *       "200":
 *         description: account 정보
 */
router.get("/:address", (req, res) => {
  const address = req.params["address"];
  let binaryAddress = address;
  try {
    if (address.length === 64) {
      binaryAddress = cryptography
        .getAddressFromPublicKey(cryptography.hexToBuffer(address))
        .toString("hex");
    } else if (address.length === 41 && address.startsWith("lsk")) {
      binaryAddress = cryptography.getAddressFromLisk32Address(address);
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
    return;
  }

  clientCache.account
    .get(binaryAddress)
    .then((account) => {
      Transaction.getTransactionOutByAddress(binaryAddress).then(
        (transactionOut) => {
          Transaction.getTransactionInByAddress(binaryAddress).then(
            (transactionIn) => {
              account = reStructAccount(account);
              account.transactionCount = {
                out: transactionOut,
                in: transactionIn,
              };
              res.send(account);
            }
          );
        }
      );
    })
    .catch((error) => {
      res.status(500).send({ error: error.message });
    });
});

/**
 * @swagger
 * paths:
 *  /accounts/{address}/transactions/{page}:
 *   get:
 *     tags: [Account]
 *     summary: account별 transaction 조회
 *     parameters:
 *      - in: path
 *        name: address
 *        schema:
 *          type: string
 *        required: true
 *        description: publicKey 또는 binaryAddress 또는 address
 *      - in: path
 *        name: page
 *        schema:
 *          type: integer
 *        required: false
 *        description: 페이지
 *     responses:
 *       "200":
 *         description: transaction 내역
 */
router.get("/:address/transactions/:page?", (req, res) => {
  let address = req.params["address"];
  let binaryAddress = address;
  const page = req.params["page"];

  try {
    if (address.length === 41) {
      binaryAddress = cryptography.getAddressFromLisk32Address(address);
    } else if (address.length === 64) {
      binaryAddress = cryptography.getAddressFromPublicKey(
        cryptography.hexToBuffer(address)
      );
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
    return;
  }

  Transaction.findByAddress(binaryAddress, page)
    .then((list) => {
      Transaction.getCountByAddress(binaryAddress).then((count) => {
        res.send({ transactions: list, count: count });
      });
    })
    .catch((error) => {
      res.status(500).send({ error: error.message });
    });
});

const reStructAccount = (account) => {
  account.address = account.address.toString("hex");
  account.token.balance = account.token.balance.toString();
  account.sequence.nonce = account.sequence.nonce.toString();
  account.dpos.delegate.totalVotesReceived =
    account.dpos.delegate.totalVotesReceived.toString();
  account.dpos.sentVotes = account.dpos.sentVotes.map((vote) => {
    vote.amount = vote.amount.toString();
    vote.delegateAddress = vote.delegateAddress.toString("hex");
    return vote;
  });
  return account;
};

module.exports = router;
