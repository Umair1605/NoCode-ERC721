const express = require('express');

const router = express.Router()

const compiler = require('../controller/compiler');

router.post('/compiler',compiler.compilerInput);
module.exports = router;