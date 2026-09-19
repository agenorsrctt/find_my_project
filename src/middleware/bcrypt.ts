import bcrypt from 'bcrypt';
import { db } from '../database/connection.js';
import type {RowDataPacket} from 'mysql2'

async function consultaSenhaBanco(id: number){
    const sql = "select senha from usuarios where id = ?";
    const [resultado] = await db.execute<RowDataPacket[]>(sql, [id]);
    return resultado[0];
}

export async function gerarHashSenha(senha: string) {
    const hash = bcrypt.hash(senha, 10);
    return hash;
}

export async function compararHashSenha(senha: string, id: number) {
    const senhaBanco = await consultaSenhaBanco(id);
    if(!senhaBanco){
        throw new Error("Usuário não encontrado.");
    }
    const resultado = await bcrypt.compare(senha, senhaBanco.senha)
    return resultado;
}