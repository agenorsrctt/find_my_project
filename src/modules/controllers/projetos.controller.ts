import type { Request, Response } from "express";
import {
    criarProjetoService,
    alterarProjetoService,
    deletarProjetoService,
    buscarProjetoService,
    listarProjetoService
} from "../services/projeto.service.js"

export async function criarProjetoController(req: Request, res: Response) {
    try {

        const dados = req.body;
        const idCriado = await criarProjetoService(dados);
        const projeto = await buscarProjetoService(idCriado);

        res.status(201).json({
            mensagem: "Projeto criado com sucesso.",
            dados: projeto
        })

    } catch (error) {

        if (error instanceof Error) {
            return res.status(500).json({
                mensagem: "Erro do servidor",
                erro: error.message
            })
        }

        res.status(500).json({
            mensagem: "Erro do servidor",
        })

    }
}

export async function alterarProjetoController(req: Request, res: Response) {
    try {

        const id = Number(req.params.id);
        const dados = req.body;

        const idRetornado = await alterarProjetoService(dados, id);

        const projeto = await buscarProjetoService(idRetornado);

        res.status(200).json({
            mensagem: "Projeto alterado com sucesso.",
            projeto: projeto
        })

    } catch (error) {

        if (error instanceof Error) {
            return res.status(500).json({
                mensagem: "Erro do servidor",
                erro: error.message
            })
        }

        res.status(500).json({
            mensagem: "Erro do servidor",
        })

    }
}

export async function deletarProjetoController(req: Request, res: Response) {
    try {

        const id = Number(req.params.id);
        const projeto = await buscarProjetoService(id);
        await deletarProjetoService(id);

        res.status(200).json({
            mensagem: "Projeto deletado com sucesso",
            projeto_deletado: projeto
        })

    } catch (error) {

        if (error instanceof Error) {
            return res.status(500).json({
                mensagem: "Erro do servidor",
                erro: error.message
            })
        }

        res.status(500).json({
            mensagem: "Erro do servidor",
        })

    }
}

export async function buscarProjetoController(req: Request, res: Response) {
    try {

        const id = Number(req.params.id);
        const projeto = await buscarProjetoService(id);

        res.status(200).json({
            mensagem: "Projeto encontrado",
            projeto: projeto
        })


    } catch (error) {

        if (error instanceof Error) {
            return res.status(500).json({
                mensagem: "Erro do servidor",
                erro: error.message
            })
        }

        res.status(500).json({
            mensagem: "Erro do servidor",
        })

    }
}

export async function listarProjetosController(req: Request, res: Response) {
    try {

        const projetos = await listarProjetoService();

        res.status(200).json({
            mensagem: "Listando Projetos",
            projetos: projetos
        })

    } catch (error) {

        if (error instanceof Error) {
            return res.status(500).json({
                mensagem: "Erro do servidor",
                erro: error.message
            })
        }

        res.status(500).json({
            mensagem: "Erro do servidor",
        })

    }
}