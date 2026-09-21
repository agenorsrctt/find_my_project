import { gerarHashSenha } from "../../middleware/bcrypt.middleware.js";
import type { AlterarUsuarioDto, UsuarioDto } from "../dtos/usuarios.dto.js";
import { buscarInstituicaoRepository } from "../repositories/instituicao.repository.js";
import {
    criarUsuarioRepository,
    alterarUsuarioRepository,
    deletarUsuarioRepository,
    buscarUsuarioRepository,
    listarUsuarioRepository,
    listarAlunoRepository,
    buscarAlunoRepository
} from "../repositories/usuario.repository.js"

export async function criarUsuarioService(dados: UsuarioDto) {
    if (!dados) {
        throw new Error("Dados não preenchido, verificar e tentar novamente.")
    }

    const senhaHash = await gerarHashSenha(dados.senha);

    dados.senha = senhaHash;

    await criarUsuarioRepository(dados);
}

export async function alterarUsuarioService(dados: AlterarUsuarioDto, id: number) {
    if (Number.isInteger(id) || id <= 0) {
        throw new Error("Usuario não identificado.")
    }

    const usuario = await buscarUsuarioRepository(id);

    if (!usuario) {
        throw new Error("Usuario não localizado")
    }

    if (!dados) {
        throw new Error("Dados não enviados.")
    }

    if (dados.senha) {
        const senhaHash = await gerarHashSenha(dados.senha);
        dados.senha = senhaHash;
    }

    await alterarUsuarioRepository(dados, id);
};

export async function deletarUsuarioService(id: number) {
    if (!id) {
        throw new Error("Usuário não identificado, verifique as informações e tente novamente.")
    }

    const usuario = await buscarUsuarioRepository(id);

    if (!usuario) {
        throw new Error("Usuario não localizado, verifique as informações e tente novamente.")
    }

    return await deletarUsuarioRepository(id);
}

export async function buscarUsuarioService(id: number) {
    if (!id || id <= 0) {
        throw new Error("Usuário não identificado, verifique as informações e tente novamente.")
    }

    const usuario = await buscarUsuarioRepository(id);

    if (!usuario) {
        throw new Error("Usuario não encontrado, verifique as informações e tente novamente.")
    }

    return usuario;
}

export async function listarUsuarioService() {
    const usuarios = await listarUsuarioRepository();

    if (!usuarios) {
        throw new Error("Nenhum usuario encontrado até o momento.")
    }

    if (usuarios.length <= 0) {
        throw new Error("Nenhum usuario encontrado até o momento");
    }

    return usuarios;
}

export async function listarAlunoService() {
    const usuarios = await listarAlunoRepository();

    if (!usuarios) {
        throw new Error("Nenhum usuario encontrado até o momento.")
    }

    if (usuarios.length <= 0) {
        throw new Error("Nenhum usuario encontrado até o momento");
    }

    return usuarios;
}

export async function buscarAlunoService(id: number) {
    if (!id || id <= 0) {
        throw new Error("Usuário não identificado, verifique as informações e tente novamente.")
    }

    const usuario = await buscarAlunoRepository(id);

    if (!usuario) {
        throw new Error("Usuario não encontrado, verifique as informações e tente novamente.")
    }

    return usuario;
}