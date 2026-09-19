import { db } from "../../database/connection.js";
import { type ResultSetHeader, type RowDataPacket } from "mysql2";
import type { AltearProjetosDTO, ProjetosDTO } from "../dtos/projetos.dto.js";

export async function criarProjetoRepository(dados: ProjetosDTO){
    const campos = "responsavel_id, instituicao_id, nome, integrantes, descricao, tecnologias, gitHub_url, img_capa_url"
    const placeholders = ("?,?,?,?,?,?,?,?")
    const valores = [
        dados.responsavel_id,
        dados.instituicao_id,
        dados.nome,
        dados.integrantes,
        dados.descricao ?? null,
        dados.tecnologias ?? null,
        dados.gitHub_url ?? null,
        dados.img_capa_url ?? null
    ]

    const sql = `insert into projetos (${campos}) values (${placeholders})`;
    
    const [resultado] = await db.execute<ResultSetHeader>(sql, valores);
    return resultado.insertId;
};

export async function alterarProjetoRepository(dados: AltearProjetosDTO, id: number) {
    
    const campos: string[] = [];
    const valores: (string | number)[] = [];

    if (dados.responsavel_id) {
        campos.push("responsavel_id");
        valores.push(dados.responsavel_id);
    }

    if (dados.instituicao_id) {
        campos.push("instituicao_id");
        valores.push(dados.instituicao_id);
    }

    if (dados.nome) {
        campos.push("nome");
        valores.push(dados.nome);
    }

    if (dados.integrantes) {
        campos.push("integrantes");
        valores.push(dados.integrantes);
    }

    if (dados.descricao) {
        campos.push("descricao");
        valores.push(dados.descricao);
    }

    if (dados.tecnologias) {
        campos.push("tecnologias");
        valores.push(dados.tecnologias);
    }

    if (dados.gitHub_url) {
        campos.push("gitHub_url");
        valores.push(dados.gitHub_url);
    }

    if (dados.img_capa_url) {
        campos.push("img_capa_url");
        valores.push(dados.img_capa_url);
    }

    valores.push(id);

    const camposPlaceholders = campos.map(campo => `${campo} = ?`);

    const sql = `update projetos set ${camposPlaceholders.join(", ")} where id = ?`;
    const [resultado] = await db.execute<ResultSetHeader>(sql, valores);
    return resultado.affectedRows;
};

export async function deletarProjetoRepository(id: number) {
    const sql = "delete from projetos where id = ?";
    
    const [resultado] = await db.execute<ResultSetHeader>(sql, [id]);
    return resultado.affectedRows;
}

export async function buscarProjetoRepository(id: number) {
    const sql = `select
    p.id, p.responsavel_id, u.nome as criador, p.instituicao_id, i.nome as instituicao, p.nome as projeto, p.descricao, p.data, p.tecnologias, p.integrantes, p.gitHub_url, p.img_capa_url
    from projetos p
    inner join usuarios u
    on u.id = p.responsavel_id
    inner join instituicoes i
    on i.id = p.instituicao_id
    where p.id = ?
    `;
    
    const [resultado] = await db.execute<RowDataPacket[]>(sql, [id]);
    return resultado[0];
}

export async function listarProjetoRepository() {
    const sql = `select
    p.id, p.responsavel_id, u.nome as criador, p.instituicao_id, i.nome as instituicao, p.nome as projeto, p.descricao, p.data, p.tecnologias, p.integrantes, p.gitHub_url, p.img_capa_url
    from projetos p
    inner join usuarios u
    on u.id = p.responsavel_id
    inner join instituicoes i
    on i.id = p.instituicao_id
    `;
    
    const [resultado] = await db.execute<RowDataPacket[]>(sql);
    return resultado
}