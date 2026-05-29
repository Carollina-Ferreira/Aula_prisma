const prisma = require('../data/prisma.js');

const cadastrar = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        // VALIDAÇÕES
        if (!nome || !email || !senha) {
            return res.status(400).json({
                erro: 'Todos os campos são obrigatórios'
            });
        }

        if (senha.length < 6) {
            return res.status(400).json({
                erro: 'A senha deve ter no mínimo 6 caracteres'
            });
        }

        const usuarioExistente = await prisma.usuario.findUnique({
            where: {
                email
            }
        });

        if (usuarioExistente) {
            return res.status(400).json({
                erro: 'Email já cadastrado'
            });
        }

        const item = await prisma.usuario.create({
            data: {
                nome,
                email,
                senha
            }
        });

        return res.status(201).json(item).end();

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            erro: 'Erro ao cadastrar usuário'
        });
    }
};

const listar = async (req, res) => {
    try {
        const itens = await prisma.usuario.findMany();

        return res.status(200).json(itens).end();

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            erro: 'Erro ao listar usuários'
        });
    }
};

const buscarID = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(id)) {
            return res.status(400).json({
                erro: 'ID inválido'
            });
        }

        const item = await prisma.usuario.findUnique({
            where: {
                id: Number(id)
            }
        });

        if (!item) {
            return res.status(404).json({
                erro: 'Usuário não encontrado'
            });
        }

        return res.status(200).json(item).end();

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            erro: 'Erro ao buscar usuário'
        });
    }
};

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        if (!id || isNaN(id)) {
            return res.status(400).json({
                erro: 'ID inválido'
            });
        }

        const usuarioExistente = await prisma.usuario.findUnique({
            where: {
                id: Number(id)
            }
        });

        if (!usuarioExistente) {
            return res.status(404).json({
                erro: 'Usuário não encontrado'
            });
        }

        const item = await prisma.usuario.update({
            where: {
                id: Number(id)
            },
            data
        });

        return res.status(200).json(item).end();

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            erro: 'Erro ao atualizar usuário'
        });
    }
};

const delet = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(id)) {
            return res.status(400).json({
                erro: 'ID inválido'
            });
        }

        const usuarioExistente = await prisma.usuario.findUnique({
            where: {
                id: Number(id)
            }
        });

        if (!usuarioExistente) {
            return res.status(404).json({
                erro: 'Usuário não encontrado'
            });
        }

        const item = await prisma.usuario.delete({
            where: {
                id: Number(id)
            }
        });

        return res.status(200).json(item).end();

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            erro: 'Erro ao deletar usuário'
        });
    }
};

module.exports = {
    cadastrar,
    listar,
    buscarID,
    update,
    delet
};