const express = require('express');
const router = express.Router();

const {
    cadastrar,
    listar,
    delet,
    update,
    buscarID
} = require('../controllers/escola.controller.js');

router.post('/cadastrar', cadastrar);
router.get('/listar', listar);

router.get('/escola/:id', buscarID);
router.put('/atualizar/:id', update);
router.delete('/deletar/:id', delet);

module.exports = router;