import { buscarProjetoRepository } from "../repositories/projetos.repository.js";
import {
    criarUpvoteRepository,
    deletarUpvoteRepository
} from "../repositories/upvote.repository.js";
import { buscarAlunoRepository } from "../repositories/usuario.repository.js";


export async function criarUpvoteService(usuario_id: number, projeto_id: number) {
    if (!usuario_id || usuario_id <= 0) {
        throw new Error("Usuário não identificado, verifique as informações e tente novamente.");
    }

    if (!projeto_id || projeto_id <= 0) {
        throw new Error("Projeto não identificado, verifique as informações e tente novamente.");
    }

    const usuario = await buscarAlunoRepository(usuario_id);

    if (!usuario) {
        throw new Error("Aluno não localizado, verifique as informações e tente novamente.");
    }

    if (usuario.tipo === "visitante") {
        throw new Error("É preciso estar logado com identificação para votar.");
    }

    const projeto = await buscarProjetoRepository(projeto_id);

    if (!projeto) {
        throw new Error("Projeto não localizado, verifique as informações e tente novamente.");
    }

    return await criarUpvoteRepository(usuario_id, projeto_id);
}

export async function deletarUpvoteService(usuario_id: number, projeto_id: number) {
    if (!usuario_id || usuario_id <= 0) {
        throw new Error("Usuário não identificado, verifique as informações e tente novamente.");
    }

    if (!projeto_id || projeto_id <= 0) {
        throw new Error("Projeto não identificado, verifique as informações e tente novamente.");
    }

    const usuario = await buscarAlunoRepository(usuario_id);

    if (!usuario) {
        throw new Error("Aluno não localizado, verifique as informações e tente novamente.");
    }

    if (usuario.tipo === "visitante") {
        throw new Error("É preciso estar logado com identificação para votar.");
    }

    const projeto = await buscarProjetoRepository(projeto_id);

    if (!projeto) {
        throw new Error("Projeto não localizado, verifique as informações e tente novamente.");
    }

    return await deletarUpvoteRepository(usuario_id, projeto_id);
}