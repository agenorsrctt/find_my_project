import {
    criarProjetoRepository,
    buscarProjetoRepository,
    deletarProjetoRepository,
    alterarProjetoRepository,
    listarProjetoRepository
} from "../repositories/projetos.repository.js";
import type { ProjetosDTO, AltearProjetosDTO } from "../dtos/projetos.dto.js";
import { buscarAlunoRepository } from "../repositories/usuario.repository.js";


export async function criarProjetoService(dados: ProjetosDTO) {
    if (!dados) {
        throw new Error("Dados do projeto não enviados, verifique as informações e tente novamente.");
    }

    const responsavel = await buscarAlunoRepository(dados.responsavel_id);
    if(responsavel && responsavel.tipo !== "responsavel"){
        throw new Error("Você não tem permissão para criar, verifique as informações e tente novamente.");
    }

    const camposObrigatorios = {
        responsavel_id: dados.responsavel_id,
        instituicao_id: dados.instituicao_id,
        nome: dados.nome,
        integrantes: dados.integrantes
    };

    for (const [chave, valor] of Object.entries(camposObrigatorios)) {

        if (valor === undefined || valor === null) {
            throw new Error(`${chave} precisa ser preenchido, verifique as informações e tente novamente.`);
        }

        if (typeof valor === "string" && !valor.trim()) {
            throw new Error(`${chave} inválido, verifique as informações e tente novamente.`);
        }

        if (typeof valor === "number" && valor <= 0) {
            throw new Error(`${chave} inválido, verifique as informações e tente novamente.`);
        }
    }

    return await criarProjetoRepository(dados);
}

export async function alterarProjetoService(dados: AltearProjetosDTO, id: number) {

    if (!Number.isInteger(id) || id <= 0) {
        throw new Error("Projeto não encontrado, verifique as informações e tente novamente.");
    }

    const projeto = await buscarProjetoRepository(id);

    if (!projeto) {
        throw new Error("Projeto não encontrado, verifique as informações e tente novamente.")
    }

    if (!dados) {
        throw new Error("Dados do projeto não enviados, verifique as informações e tente novamente.");
    };

    if(dados.responsavel_id !== projeto.responvsavel_id){
        throw new Error("Você não tem autorização sobre este projeto, verifique as informações e tente novamente.")
    }

    const campos = {
        descricao: dados.descricao,
        gitHub_url: dados.gitHub_url,
        img_capa_url: dados.img_capa_url,
        instituicao_id: dados.instituicao_id,
        integrantes: dados.integrantes,
        nome: dados.nome,
        responsavel_id: dados.responsavel_id,
        tecnologias: dados.tecnologias
    };

    for (const [chave, valor] of Object.entries(campos)) {

        if (valor !== undefined) {

            if (typeof valor === "string" && !valor.trim()) {
                throw new Error(`${chave} inválido, verifique as informações e tente novamente.`);
            }

            if (typeof valor === "number" && valor <= 0) {
                throw new Error(`${chave} inválido, verifique as informações e tente novamente.`);
            }
        }

    };

    return await alterarProjetoRepository(dados, id);
}


export async function deletarProjetoService(id: number, responsavel_id: number) {
    if (!Number.isInteger(id) || id <= 0) {
        throw new Error("Projeto não encontrado, verifique as informações e tente novamente.");
    }

    if (!Number.isInteger(responsavel_id) || responsavel_id <= 0) {
        throw new Error("Usuario não encontrado, verifique as informações e tente novamente.");
    }

    const aluno = await buscarAlunoRepository(responsavel_id);

    if (!aluno) {
        throw new Error("Usuario autenticado não encontrado, verifique as informações e tente novamente.");
    }

    const projeto = await buscarProjetoRepository(id);

    if (!projeto) {
        throw new Error("Projeto não encontrado, verifique as informações e tente novamente.")
    }

    if(projeto.resposavel_id !== responsavel_id){
        throw new Error("Você não tem autorização sobre este projeto, verifique as informações e tente novamente.")
    }

    return await deletarProjetoRepository(id);
}

export async function buscarProjetoService(id: number) {
    if (!Number.isInteger(id) || id <= 0) {
        throw new Error("Projeto não encontrado, verifique as informações e tente novamente.");
    }

    const projeto = await buscarProjetoRepository(id);

    if (!projeto) {
        throw new Error("Projeto não encontrado, verifique as informações e tente novamente.")
    }

    return projeto;
}

export async function listarProjetoService() {
    const projetos = await listarProjetoRepository();

    if (projetos.length <= 0) {
        throw new Error("Nenhum projeto encontrado.")
    }

    return projetos;
}