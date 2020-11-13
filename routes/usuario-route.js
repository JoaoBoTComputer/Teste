const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/usuario-controller');
const autenticacao = require('../middleware/autenticacao');

router.post('/register',usuarioController.createUser);
router.post('/login',usuarioController.login);
router.get('/confirm',usuarioController.confirmeRegister)
router.get('/changeMail',autenticacao.required,usuarioController.changeMail);

module.exports = router;