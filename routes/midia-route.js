const express = require('express');
const router = express.Router();

const midiaControlelr = require('../controllers/midia-controller');

router.get("/search/movie?:search",midiaControlelr.searchMovie);
router.post("/favorito",midiaControlelr.addFavorito);

module.exports = router;