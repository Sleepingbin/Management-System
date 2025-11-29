const express = require('express');
const router = express.Router();
const getScoreHandler = require('../../router_handler/getAllScore_handler');

router.get('/api/admin/getAllScore', getScoreHandler.get);

module.exports = router;
