const express = require('express');
const router = express.Router();
const getGroupHandler = require('../../router_handler/getGroup_handler');
const updateGroupHandler = require("../../router_handler/changeGroup_handler");

router.get('/api/admin/getGroup', getGroupHandler.get);
router.put('/api/admin/updateGroup', updateGroupHandler.update);
module.exports = router;

