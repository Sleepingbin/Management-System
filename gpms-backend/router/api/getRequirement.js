const express = require('express');
const router = express.Router();
const getRequirementHandler = require('../../router_handler/getRequirement_handler');

router.get('/api/stu/getRequirement', getRequirementHandler.get);

module.exports = router;
