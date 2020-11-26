const express = require('express');
const router = express.Router();

const midiaControlelr = require('../controllers/midia-controller');

router.get("/search/movie",midiaControlelr.searchMovie);

module.exports = router;