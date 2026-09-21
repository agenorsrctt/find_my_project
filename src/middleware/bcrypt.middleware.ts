import bcrypt from 'bcrypt';

export async function gerarHashSenha(senha: string) {
    const hash = bcrypt.hash(senha, 10);
    return hash;
}

export async function compararHashSenha(senha: string, hash: string) {
    return await bcrypt.compare(senha, hash);
}