import { buscarInstituicaoRepository } from "../repositories/instituicao.repository.js";
import {
    criarInstituicaoService,
    alterarInstituicaoService,
    deletarInstituicaoService,
    buscarInstituicaoService,
    listarInstituicaoService
} from "../services/instituicao.service.js";

import type { Request, Response } from "express";
import { buscarAlunoService } from "../services/usuario.service.js";

export async function criarInstituicaoController(req: Request, res: Response) {
    try {

        const {nome} = req.body;

        const id = await criarInstituicaoService(nome);

        const dados = await buscarInstituicaoRepository(id);

        res.status(201).json({
            mensagem: "Instituição criada com sucesso!",
            dados: dados
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


export async function alterarInstituicaoController(req: Request, res: Response) {
    try {

        const {nome} = req.body;
        const id = Number(req.params.id);
        await alterarInstituicaoService(nome, id);
        const instituicaoAlterada = await buscarAlunoService(id);

        res.status(200).json({
            mensagem: "Nome da instituição alterado com sucesso!",
            id: instituicaoAlterada,
            nome: nome
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


export async function deletarInstituicaoController(req: Request, res: Response) {
    try {

        const id = Number(req.params.id);
        const dados = await buscarInstituicaoRepository(id);
        await deletarInstituicaoService(id);

        res.status(200).json({
            mensagem: "Instituição deletada com sucesso!",
            dados: dados
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


export async function buscarInstituicaoController(req: Request, res: Response) {
    try {

        const id = Number(req.params.id);
        const instituicao = await buscarInstituicaoService(id);

        res.status(200).json({
            mensagem: "Instituição encontrada com sucesso!",
            dados: instituicao
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


export async function listarInstituicaoController(req: Request, res: Response) {
    try {

        const id = Number(req.params.id);
        const instituicoes = await listarInstituicaoService();

        res.status(200).json({
            mensagem: "Instituições encontradas com sucesso!",
            dados: instituicoes
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