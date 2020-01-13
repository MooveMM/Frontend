var express = require('express')
var router = express.Router()

/**
 * @api {get} /health Request Health information
 * @apiName healthCheck
 * @apiGroup health
 *
 *
 * @apiSuccess {String} ok
 */

//Health check logic
router.get('/', function (req, res) {
    res.send(200)
  })
module.exports = router