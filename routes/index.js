const router = require('express').Router();

// Import our modular routers for /tips and /feedback
const noteRouter = require('./notes');

router.use('/notes', noteRouter);

module.exports = router;
