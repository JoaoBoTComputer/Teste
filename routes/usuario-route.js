const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/usuario-controller');

router.post('/register/',usuarioController.createUser);
router.post('/login',usuarioController.login);

module.exports = router;