const router = require('express').Router()
const Block = require('../models/block')


router.get('/:page?', (req, res) => {
    const page = req.params["page"] || 0;
    Block.getList(page).then(list => {
        Block.getCount().then(count => {
            res.send({blocks: list, count})
        })
    })
})

router.get('/id/:id', (req, res) => {
    const transactionID = req.params["id"]
    Block.findBlockByID(transactionID).then(block => {
        res.send(block)
    })
})

router.get('/height/:height', (req, res) => {
    const blockHeight = req.params["height"]
    Block.findBlockByHeight(blockHeight).then(block => {
        res.send(block)
    })
})

module.exports = router;
