import { type ResultSetHeader, type RowDataPacket } from "mysql2";
import { db } from "../../database/connection.js";
import type { AlterarUsuarioDto, UsuarioDto } from "../dtos/usuarios.dto.js";

export async function criarUsuarioRepository(dados: UsuarioDto) {
    const campos = "nome, email, senha, tipo, instituicao_id, identificacao, curso"
    const placeholders = "?, ?, ?, ?, ?, ?, ?"
    const valores = [
        dados.nome,
        dados.email,
        dados.senha,
        dados.tipo,
        dados.instituicao_id ?? null,
        dados.identificacao ?? null,
        dados.curso ?? null
    ];

    const sql = `insert into usuarios (${campos}) values (${placeholders})`;
    const [resultado] = await db.execute<ResultSetHeader>(sql, valores);
    return resultado.insertId;
};

export async function alterarUsuarioRepository(dados: AlterarUsuarioDto, id: number) {

    const campos: string[] = [];
    const valores: (string | number)[] = [];

    if (dados.nome) {
        campos.push("nome");
        valores.push(dados.nome);
    }

    if (dados.email) {
        campos.push("email");
        valores.push(dados.email);
    }

    if (dados.senha) {
        campos.push("senha");
        valores.push(dados.senha);
    }

    if (dados.tipo) {
        campos.push("tipo");
        valores.push(dados.tipo);
    }

    if (dados.instituicao_id) {
        campos.push("instituicao_id");
        valores.push(dados.instituicao_id);
    }

    if (dados.identificacao) {
        campos.push("identificacao");
        valores.push(dados.identificacao);
    }

    if (dados.curso) {
        campos.push("curso");
        valores.push(dados.curso);
    }

    if (campos.length === 0) {
        throw new Error("Nenhum campo enviado para alteração.");
    }

    valores.push(id);

    const camposPlaceholders = campos.map(campo => `${campo} = ?`);

    const sql = `update usuarios set ${camposPlaceholders.join(", ")} where id = ?`;
    const [resultado] = await db.execute<ResultSetHeader>(sql, valores);
    return resultado.affectedRows;
};

export async function deletarUsuarioRepository(id: number) {
    const sql = "delete from usuarios where id = ?";
    const [resultado] = await db.execute<ResultSetHeader>(sql, [id]);
    return resultado.affectedRows;
};

export async function buscarUsuarioRepository(id: number) {
    const sql = `
        select 
        id, nome, email, tipo, instituicao_id, identificacao, curso
        from usuarios 
        where id = ?
    `;

    const [resultado] = await db.execute<RowDataPacket[]>(sql, [id]);
    return resultado[0];
};

export async function listarUsuarioRepository() {
    const sql = `
        select 
        id, nome, email, tipo
        from usuarios
    `;
    const [resultado] = await db.execute<RowDataPacket[]>(sql);
    return resultado
};

export async function listarAlunoRepository() {

    const sql = `
        select u.id as aluno_id, u.nome as aluno, u.email, u.tipo, u.identificacao, u.curso,
        i.id as instituicao_id, i.nome as instituicoes
        from usuarios u
        inner join instituicoes i
        on u.instituicao_id = i.id
    `;
    const [resultado] = await db.execute<RowDataPacket[]>(sql);
    return resultado
};

export async function buscarAlunoRepository(id: number) {
    const sql = `
        select u.id as aluno_id, u.nome as nome, u.email, u.tipo, u.identificacao, u.curso,
        i.id as instituicao_id, i.nome as instituicoes
        from usuarios u
        inner join instituicoes i
        on u.instituicao_id = i.id
        where u.id = ?
    `;

    const [resultado] = await db.execute<RowDataPacket[]>(sql, [id]);
    return resultado[0];
};

export async function buscarEmailAlunoRepository(email: string) {
    const sql = "select id, email, senha from usuarios where email = ?";
    const [resultado] = await db.execute<RowDataPacket[]>(sql, [email]);
    return resultado[0];
}

export async function buscarUsuarioPorInstituicaoRepository(instituicao_id: number) {
    const sql = `
        select id
        from usuarios
        where instituicao_id = ?
        limit 1
    `;

    const [resultado] = await db.execute<RowDataPacket[]>(sql, [instituicao_id]);

    return resultado[0];
}