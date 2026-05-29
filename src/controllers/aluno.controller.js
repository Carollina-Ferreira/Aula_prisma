const prisma = require('../data/prisma.js');

const cadastrar = async (req, res) => {
    try {
        const { nome, idade, escolaId } = req.body;

        // VALIDAÇÕES
        if (!nome || !idade || !escolaId) {
            return res.status(400).json({
                erro: 'Nome, idade e escolaId são obrigatórios'
            });
        }

        if (isNaN(idade)) {
            return res.status(400).json({
                erro: 'Idade deve ser um número'
            });
        }

        if (isNaN(escolaId)) {
            return res.status(400).json({
                erro: 'escolaId deve ser um número'
            });
        }

        // verificar se escola existe
        const escolaExiste = await prisma.escola.findUnique({
            where: {
                id: Number(escolaId)
            }
        });

        if (!escolaExiste) {
            return res.status(404).json({
                erro: 'Escola não encontrada'
            });
        }

        const aluno = await prisma.aluno.create({
            data: {
                nome,
                idade: Number(idade),
                escolaId: Number(escolaId)
            }
        });

        return res.status(201).json(aluno).end();

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            erro: 'Erro ao cadastrar aluno'
        });
    }
};

const listar = async (req, res) => {
    try {
        const alunos = await prisma.aluno.findMany({
            include: {
                escola: true
            }
        });

        return res.status(200).json(alunos).end();

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            erro: 'Erro ao listar alunos'
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

        const aluno = await prisma.aluno.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                escola: true
            }
        });

        if (!aluno) {
            return res.status(404).json({
                erro: 'Aluno não encontrado'
            });
        }

        return res.status(200).json(aluno).end();

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            erro: 'Erro ao buscar aluno'
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

        const alunoExiste = await prisma.aluno.findUnique({
            where: {
                id: Number(id)
            }
        });

        if (!alunoExiste) {
            return res.status(404).json({
                erro: 'Aluno não encontrado'
            });
        }

        if (data.idade && isNaN(data.idade)) {
            return res.status(400).json({
                erro: 'Idade deve ser um número'
            });
        }

        if (data.escolaId) {
            const escolaExiste = await prisma.escola.findUnique({
                where: {
                    id: Number(data.escolaId)
                }
            });

            if (!escolaExiste) {
                return res.status(404).json({
                    erro: 'Escola não encontrada'
                });
            }
        }

        const aluno = await prisma.aluno.update({
            where: {
                id: Number(id)
            },
            data: {
                ...data,
                idade: data.idade ? Number(data.idade) : undefined,
                escolaId: data.escolaId ? Number(data.escolaId) : undefined
            }
        });

        return res.status(200).json(aluno).end();

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            erro: 'Erro ao atualizar aluno'
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

        const alunoExiste = await prisma.aluno.findUnique({
            where: {
                id: Number(id)
            }
        });

        if (!alunoExiste) {
            return res.status(404).json({
                erro: 'Aluno não encontrado'
            });
        }

        const aluno = await prisma.aluno.delete({
            where: {
                id: Number(id)
            }
        });

        return res.status(200).json(aluno).end();

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            erro: 'Erro ao deletar aluno'
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