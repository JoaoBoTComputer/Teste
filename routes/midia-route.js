const express = require('express');
const router = express.Router();

const midiaControlelr = require('../controllers/midia-controller');

router.get("/search/movie?:search",midiaControlelr.searchMovie);

//favoritos
router.post("/favorito",midiaControlelr.addFavorito);
router.get("/favorito/all?:id",midiaControlelr.getFavoritos);
router.get("/favorito/movie?:id",midiaControlelr.searchDatailsMovie);

//assistidos
router.post("/assistido",midiaControlelr.addAssistidos);
router.get("/assistido/all?:id",midiaControlelr.getAssistidos);
router.get("/assistido/movie?:id",midiaControlelr.searchDatailsMovie);

//assistir
router.post("/assistir",midiaControlelr.addAssistir);
router.get("/assistir/all?:id",midiaControlelr.getAssistir);
router.get("/assistir/movie?:id",midiaControlelr.searchDatailsMovie);


module.exports = router;