const express = require('express');
const router = express.Router();

const {
    cadastrar,
    listar,
    delet,
    update,
    buscarID
} = require('../controllers/aluno.controller.js');

router.post('/cadastrar', cadastrar);
router.get('/listar', listar);

router.get('/aluno/:id', buscarID);
router.put('/atualizar/:id', update);
router.delete('/deletar/:id', delet);

module.exports = router;