const router = require('express').Router()
const Transaction = require('../models/transaction')


router.get('/:page?', (req, res) => {
    const page = req.params["page"] || 0;
    Transaction.getList(page).then(list => {
        Transaction.getCount().then(count => {
            res.send({transactions: list, count})
        })
    })
})

router.get('/id/:id', (req, res) => {
    const transactionID = req.params["id"]
    Transaction.findTransaction(transactionID).then(transaction => {
        res.send(transaction)
    })
})

module.exports = router;
