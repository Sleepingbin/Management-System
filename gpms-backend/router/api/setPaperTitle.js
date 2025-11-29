const express = require('express');
const router = express.Router();
const setPaperTitle_handler = require('../../router_handler/setPaperTitle_handler');

router.put('/api/stu/setTitle', setPaperTitle_handler.set);

module.exports = router;
