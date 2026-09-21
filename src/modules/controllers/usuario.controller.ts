import type { AlterarUsuarioDto, UsuarioDto } from "../dtos/usuarios.dto.js";
import {
    criarUsuarioService,
    alterarUsuarioService,
    deletarUsuarioService,
    buscarUsuarioService,
    listarUsuarioService,
    listarAlunoService,
    buscarAlunoService
} from "../services/usuario.service.js"
import type { Request, Response } from "express"


export async function criarUsuarioController(req: Request, res: Response) {
    try {

        const dados: UsuarioDto = req.body;
        const idCriado = await criarUsuarioService(dados);
        const usuario = await buscarUsuarioService(idCriado);
        console.log(usuario);

        res.status(201).json({
            mensagem: "Usuario criado com sucesso!",
            dados: usuario
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

export async function alterarUsuarioController(req: Request, res: Response) {
    try {

        const dados: AlterarUsuarioDto = req.body;
        const idSolicitado = Number(req.params.id);
        const id = res.locals.usuario.id
        if (idSolicitado !== id) {
            return res.status(403).json({
                mensagem: "Você não tem permissão para alterar este usuário."
            })
        }
        const resultado = await alterarUsuarioService(dados, id);

        res.status(200).json({
            mensagem: "Usuario alterado com sucesso!",
            dados: resultado
        })


    } catch (error) {

        if (error instanceof Error) {
            return res.status(500).json({
                mensagem: "Erro do servidor",
                erro: error.message,
                causa: error.cause
            })
        }

        res.status(500).json({
            mensagem: "Erro do servidor",
        })


    }
}

export async function deletarUsuarioController(req: Request, res: Response) {
    try {

        const idSolicitado = Number(req.params.id);
        const id = res.locals.usuario.id
        if (idSolicitado !== id) {
            return res.status(403).json({
                mensagem: "Você não tem permissão para deletar este usuário."
            })
        }
        const usuario = await buscarUsuarioService(id);
        await deletarUsuarioService(id);

        res.status(200).json({
            mensagem: "Usuario deletado com sucesso",
            deletado: usuario
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

export async function buscarUsuarioController(req: Request, res: Response) {
    try {

        const id = Number(req.params.id);
        const usuario = await buscarUsuarioService(id);

        res.status(200).json({
            mensagem: "Usuario localizado",
            usuario: usuario
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

export async function listarUsuarioController(req: Request, res: Response) {
    try {

        const usuarios = await listarUsuarioService();

        res.status(200).json({
            mensagem: "Listando usuarios",
            dados: usuarios
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


export async function listarAlunoController(req: Request, res: Response) {
    try {

        const usuarios = await listarAlunoService();

        res.status(200).json({
            mensagem: "Listando alunos",
            dados: usuarios
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

export async function buscarAlunoController(req: Request, res: Response) {
    try {

        const id = Number(req.params.id);
        const usuario = await buscarAlunoService(id);

        res.status(200).json({
            mensagem: "Aluno localizado",
            aluno: usuario
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