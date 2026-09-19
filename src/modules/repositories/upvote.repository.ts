import { type ResultSetHeader, type RowDataPacket } from "mysql2";
import { db } from "../../database/connection.js";

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