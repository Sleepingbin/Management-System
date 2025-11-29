const express = require('express');
const router = express.Router();
const changeGroup = require('../../router_handler/changeGroup_handler');

router.get('/api/admin/changeGroup', changeGroup.get);
router.put('/api/admin/updateGroup', changeGroup.update);

module.exports = router;
