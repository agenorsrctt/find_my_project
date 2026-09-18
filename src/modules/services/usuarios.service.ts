import type { AlterarUsuarioDto, UsuarioDto } from "../dtos/usuarios.dto.js";
import { buscarInstituicaoRepository } from "../repositories/instituicao.repository.js";
import {
    criarUsuarioRepository,
    alterarUsuarioRepository,
    deletarUsuarioRepository,
    buscarUsuarioRepository,
    listarUsuarioRepository
} from "../repositories/usuarios.repository.js"

export async function criarUsuarioService(dados: UsuarioDto) {

    const camposObrigatorios: (string | number | undefined)[] = [dados.nome, dados.email, dados.senha, dados.tipo];

    if (dados.tipo !== "visitante" && dados.tipo !== "superAdmin") {
        camposObrigatorios.push(dados.identificacao, dados.instituicao_id, dados.curso);
    };

    for (const campo of camposObrigatorios) {
        if (!campo) {
            throw new Error("É nescessário preencher todos os campos, verifique as informações e tente novamente.")
        };
    };

    return criarUsuarioRepository(dados);
}

export async function alterarUsuarioService(dados: AlterarUsuarioDto, id: number) {

    if (dados.nome !== undefined) {
        if (!dados.nome.trim().replace(/\s+/g, " ")) {
            throw new Error("Nome precisa ser preenchido, verifique as informações e tente novamente.");
        };

        if (dados.nome.length > 100 || dados.nome.length < 3) {
            throw new Error("Nome inválido, verifique as informações e tente novamente..");
        }

        if (!/^[A-Za-zÀ-ÿ\s]+$/.test(dados.nome)) {
            throw new Error("Nome inválido, verifique as informações e tente novamente.")
        }

        dados.nome = dados.nome.toLowerCase();
    };

    if (dados.email !== undefined) {

        dados.email = dados.email.trim();

        if (dados.email.length > 100 || dados.email.length < 11) {
            throw new Error("E-mail inválido, verifique as informações e tente novamente.");
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dados.email)) {
            throw new Error("E-mail inválido.");
        }

        dados.email = dados.email.toLowerCase();

    }

    if (dados.senha !== undefined) {
        if (!dados.senha) {
            throw new Error("Senha inválida, verifique as informações e tente novamente.");
        }

        if (dados.senha.length < 8 || dados.senha.length > 16) {
            throw new Error("Tamnho de senha inválida, verifique as informações e tente novamente.");
        }

        if (/\s/.test(dados.senha)) {
            throw new Error("A senha não pode conter espaços.");
        }

        if (!/[A-Z]/.test(dados.senha)) {
            throw new Error("A senha precisa possuir pelo menos uma letra maiúscula.");
        }

        if (!/[a-z]/.test(dados.senha)) {
            throw new Error("A senha precisa possuir pelo menos uma letra minúscula.");
        }

        if (!/[0-9]/.test(dados.senha)) {
            throw new Error("A senha precisa possuir pelo menos um número.");
        }

        if (!/[^A-Za-z0-9]/.test(dados.senha)) {
            throw new Error("A senha precisa possuir pelo menos um caractere especial.");
        }
    }

    if (dados.tipo !== undefined) {
        if (dados.tipo !== "aluno" && dados.tipo !== "responsavel" && dados.tipo !== "visitante") {
            throw new Error("Tipo precisa ser igual ao padrao do sistema, verifique as informações e tente novamente.");
        };
    };

    if (dados.instituicao_id !== undefined) {

        if (!Number.isInteger(dados.instituicao_id) || dados.instituicao_id <= 0) {
            throw new Error("Instituição inválida, verifique as informações e tente novamente.")
        };

        const resultado = await buscarInstituicaoRepository(dados.instituicao_id);

        if (!resultado) {
            throw new Error("Nenhuma instituição encontrada, verifique as informações e tente novamente.");
        };
    };

    if(dados.identificacao !== undefined && !dados.identificacao) {
        throw new Error("Identificação inválida, verifique as informações e tente novamente.");
    };

    if(dados.curso !== undefined){
        if (!dados.curso.trim().replace(/\s+/g, " ")) {
            throw new Error("Curso precisa ser preenchido, verifique as informações e tente novamente.");
        };

        if (dados.curso.length > 100 || dados.curso.length < 3) {
            throw new Error("Curso inválido, verifique as informações e tente novamente..");
        }

        if (!/^[A-Za-zÀ-ÿ\s]+$/.test(dados.curso)) {
            throw new Error("Curso inválido, verifique as informações e tente novamente.")
        }

    }
};

