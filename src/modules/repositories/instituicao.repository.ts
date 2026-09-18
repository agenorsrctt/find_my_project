import { type ResultSetHeader } from "mysql2";
import { db } from "../../database/connection.js";

export async function criarInstituicaoRepository(nome: string){
    const sql = "insert into instituicao (nome) values (?)";
    const [resultado] = await db.execute<ResultSetHeader>(sql, [nome]);
    return resultado.insertId;
};

export async function alterarInstituicaoRepository(nome: string, id: number) {
    const sql = "update instituicao (nome) set nome = ? where id = ?";
    const [resultado] = await db.execute<ResultSetHeader>(sql, [nome]);
    return resultado.affectedRows;
};

export async function deletarInstituicaoRepository(id: number) {
    const sql = "delete from instituicao where id = ?";
    const [resultado] = await db.execute<ResultSetHeader>(sql, [id]);
    return resultado.affectedRows;
}

export async function buscarInstituicaoRepository(id: number) {
    const sql = "select * from instituicao where id = ?";
    const [resultado] = await db.execute<ResultSetHeader>(sql, [id]);
    return resultado.affectedRows;
}

export async function listarInstituicaoRepository() {
    const sql = "select * from instituicao";
    const [resultado] = await db.execute<ResultSetHeader>(sql);
    return resultado
}