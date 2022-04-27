const express = require('express');

// Import our modular routers for /tips and /feedback
const noteRouter = require('./notes');

const router = express();

router.use('/notes', noteRouter);

module.exports = router;
