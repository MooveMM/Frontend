var express = require('express')
var router = express.Router()
const path = require('path');
/**
 * @api {get} /docs/ see Api docs
 * @apiName docs
 * @apiGroup Docs
 *
 */

//Health check logic
router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../apidoc', 'index.html'));
  })

module.exports = router