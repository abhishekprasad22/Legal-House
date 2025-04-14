const express = require('express');
const { summarize } = require('../controllers/summarize.controller.js');
const router = express.Router();

router.post('/summarize', summarize);

module.exports = router;