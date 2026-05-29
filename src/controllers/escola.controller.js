const prisma = require('../data/prisma.js');

const cadastrar = async (req, res) => {
    try {
        const { nome, endereco, numero } = req.body;

        // VALIDAÇÕES
        if (!nome || !numero) {
            return res.status(400).json({
                erro: 'Nome e número são obrigatórios'
            });
        }

        if (isNaN(numero)) {
            return res.status(400).json({
                erro: 'Número deve ser um valor numérico'
            });
        }

        const escola = await prisma.escola.create({
            data: {
                nome,
                endereco,
                numero: Number(numero)
            }
        });

        return res.status(201).json(escola).end();

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            erro: 'Erro ao cadastrar escola'
        });
    }
};

const listar = async (req, res) => {
    try {
        const escolas = await prisma.escola.findMany({
            include: {
                alunos: true
            }
        });

        return res.status(200).json(escolas).end();

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            erro: 'Erro ao listar escolas'
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

        const escola = await prisma.escola.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                alunos: true
            }
        });

        if (!escola) {
            return res.status(404).json({
                erro: 'Escola não encontrada'
            });
        }

        return res.status(200).json(escola).end();

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            erro: 'Erro ao buscar escola'
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

        const escolaExistente = await prisma.escola.findUnique({
            where: {
                id: Number(id)
            }
        });

        if (!escolaExistente) {
            return res.status(404).json({
                erro: 'Escola não encontrada'
            });
        }

        if (data.numero && isNaN(data.numero)) {
            return res.status(400).json({
                erro: 'Número deve ser um valor numérico'
            });
        }

        const escola = await prisma.escola.update({
            where: {
                id: Number(id)
            },
            data: {
                ...data,
                numero: data.numero ? Number(data.numero) : undefined
            }
        });

        return res.status(200).json(escola).end();

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            erro: 'Erro ao atualizar escola'
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

        const escolaExistente = await prisma.escola.findUnique({
            where: {
                id: Number(id)
            }
        });

        if (!escolaExistente) {
            return res.status(404).json({
                erro: 'Escola não encontrada'
            });
        }

        const escola = await prisma.escola.delete({
            where: {
                id: Number(id)
            }
        });

        return res.status(200).json(escola).end();

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            erro: 'Erro ao deletar escola'
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