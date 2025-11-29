const express = require('express');
const router = express.Router();
const getStuList_handler = require('../../router_handler/getStuList_handler');

router.post('/api/teacher/getStuList', getStuList_handler.getStuList);
router.post('/api/teacher/getStuList1', getStuList_handler.getStuList1);
module.exports = router;
