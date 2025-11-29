const express = require('express');
const router = express.Router();
const uploadRequirementHandler = require('../../router_handler/uploadRequirement_handler');

router.post('/api/teacher/uploadRequirement', uploadRequirementHandler.upload);

module.exports = router;
