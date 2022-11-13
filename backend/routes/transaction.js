const router = require("express").Router();
const Transaction = require("../models/transaction");

/**
 * @swagger
 * paths:
 *  /transactions/{page}:
 *   get:
 *     tags: [Transaction]
 *     summary: transaction 리스트 조회
 *     parameters:
 *      - in: path
 *        name: page
 *        schema:
 *          type: integer
 *        required: false
 *        description: 페이지
 *     responses:
 *       "200":
 *         description: transaction 리스트(페이지당 20개)
 */
router.get("/:page?", (req, res) => {
  const page = req.params["page"] || 1;
  Transaction.getList(page)
    .then((list) => {
      Transaction.getCount().then((count) => {
        res.send({ transactions: list, count });
      });
    })
    .catch((error) => {
      res.status(500).send({ error: error.message });
    });
});

/**
 * @swagger
 * paths:
 *  /transactions/id/{id}:
 *   get:
 *     tags: [Transaction]
 *     summary: transaction 조회
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: transaction id
 *     responses:
 *       "200":
 *         description: transaction 정보
 */
router.get("/id/:id", (req, res) => {
  const transactionID = req.params["id"];
  Transaction.findTransaction(transactionID)
    .then((transaction) => {
      res.send(transaction);
    })
    .catch((error) => {
      res.status(500).send({ error: error.message });
    });
});

module.exports = router;
