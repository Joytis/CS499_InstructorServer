const express = require('express');

const router = express.Router();

/* GET users listing. */
router.get('/favicon.ico', (req, res) => {
  res.send('respond with a resource');
});

module.exports = router;
