const router = require('express').Router()
const Block = require('../models/block')

/**
 * @swagger
 * paths:
 *  /blocks/{page}:
 *   get:
 *     tags: [Block]
 *     summary: block 리스트 조회
 *     parameters:
 *      - in: path
 *        name: page
 *        schema:
 *          type: integer
 *        required: false
 *        description: 페이지
 *     responses:
 *       "200":
 *         description: block 리스트(페이지당 20개)
 */
router.get('/:page?', (req, res) => {
    const page = req.params["page"] || 0;
    Block.getList(page).then(list => {
        Block.getCount().then(count => {
            res.send({blocks: list, count})
        })
    })
})

/**
 * @swagger
 * paths:
 *  /blocks/id/{id}:
 *   get:
 *     tags: [Block]
 *     summary: block 조회
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: 블록 id
 *     responses:
 *       "200":
 *         description: block 정보
 */
router.get('/id/:id', (req, res) => {
    const transactionID = req.params["id"]
    Block.findBlockByID(transactionID).then(block => {
        res.send(block)
    })
})

/**
 * @swagger
 * paths:
 *  /blocks/height/{height}:
 *   get:
 *     tags: [Block]
 *     summary: block 조회
 *     parameters:
 *      - in: path
 *        name: height
 *        schema:
 *          type: integer
 *        required: true
 *        description: 블록 height
 *     responses:
 *       "200":
 *         description: block 정보
 */
router.get('/height/:height', (req, res) => {
    const blockHeight = req.params["height"]
    Block.findBlockByHeight(blockHeight).then(block => {
        res.send(block)
    })
})

module.exports = router;
