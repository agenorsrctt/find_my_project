import { gerarHashSenha } from "../../middleware/bcrypt.js";
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
        throw new Error("Dados não enviados, verifique as informações e tente novamente.");
    }

    const camposObrigatorios: (string | number | undefined)[] = [dados.nome, dados.email, dados.senha, dados.tipo];

    if (dados.tipo !== "visitante" && dados.tipo !== "superAdmin") {
        camposObrigatorios.push(dados.identificacao, dados.instituicao_id, dados.curso);
    };

    for (const campo of camposObrigatorios) {
        if (!campo) {
            throw new Error("É nescessário preencher todos os campos, verifique as informações e tente novamente.")
        };
    };

    if (camposObrigatorios.length <= 0) {
        throw new Error("Dados inválido, verifique as informações e tente novamente.");
    }

    dados.nome = dados.nome.toLowerCase();

    if (dados.curso) {
        dados.curso = dados.curso.toLowerCase();
    }

    const senhaHash = await gerarHashSenha(dados.senha);
    dados.senha = senhaHash;

    const usuario = await criarUsuarioRepository(dados);

    if (!usuario) {
        throw new Error("Usuario não criado, verifique as informações e tente novamente.");
    }

    return usuario;
}

export async function alterarUsuarioService(dados: AlterarUsuarioDto, id: number) {

    if (!id) {
        throw new Error("Identificação não enviada, verifique as informações e tente novamente.")
    }

    if (!dados) {
        throw new Error("Alterações não enviadas, verifique as informações e tente novamente.")
    }

    const usuario = await buscarUsuarioRepository(id);

    if (!usuario) {
        throw new Error("Usuario não encontrado, verifique as informações e tente novamente.")
    }

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

    if (dados.identificacao !== undefined && !dados.identificacao) {
        throw new Error("Identificação inválida, verifique as informações e tente novamente.");
    };

    if (dados.curso !== undefined) {
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

    if (dados.nome) {
        dados.nome = dados.nome.toLowerCase();
    }

    if (dados.curso) {
        dados.curso = dados.curso.toLowerCase();
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