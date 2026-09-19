import { type ResultSetHeader, type RowDataPacket } from "mysql2";
import { db } from "../../database/connection.js";

interface UpvoteCount extends RowDataPacket {
    quantidade: number;
}

interface ProjetoUpvotes extends RowDataPacket {
    projeto_id: number;
    quantidade: number;
}

export async function criarUpvoteRepository(usuario_id: number, projeto_id: number) {
    const sql = "insert into upvotes (usuario_id, projeto_id) values (?, ?)";
    const [resultado] = await db.execute<ResultSetHeader>(sql, [usuario_id, projeto_id]);
    return resultado.insertId;
}

export async function deletarUpvoteRepository(usuario_id: number, projeto_id: number) {
    const sql = "delete from upvotes where usuario_id = ? and projeto_id = ?";
    const [resultado] = await db.execute<ResultSetHeader>(sql, [usuario_id, projeto_id]);
    return resultado.affectedRows;
}

export async function contarUpvotesRepository(projeto_id: number) {
    const sql = "select count(*) as quantidade from upvotes where projeto_id = ?";
    const [resultado] = await db.execute<UpvoteCount[]>(sql, [projeto_id]);
    return resultado[0]?.quantidade ?? 0;
}

export async function listarUpvotesRepository() {
    const sql = "select projeto_id, count(*) as quantidade from upvotes group by projeto_id order by quantidade desc";
    const [resultado] = await db.execute<ProjetoUpvotes[]>(sql);
    return resultado;
}