const prisma = require('../data/prisma.js');

const cadastrar = async (req, res) => {
    const data = req.body;

    const item = await prisma.usuario.create({
        data
    });

    return res.status(201).json(item).end();
};

const listar = async (req, res) => {
    const itens = await prisma.usuario.findMany();

    return res.status(200).json(itens).end();
};

const buscarID = async (req, res) => {
    const { id } = req.params;

    const item = await prisma.usuario.findUnique({
        where: {
            id: Number(id)
        }
    });

    return res.status(200).json(item).end();
};

const update = async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    const item = await prisma.usuario.update({
        where: {
            id: Number(id)
        },
        data
    });

    return res.status(200).json(item).end();
};

const delet = async (req, res) => {
    const { id } = req.params;

    const item = await prisma.usuario.delete({
        where: {
            id: Number(id)
        }
    });

    return res.status(200).json(item).end();
};

module.exports = {
    cadastrar,
    listar,
    buscarID,
    update,
    delet
};