import jwt from 'jsonwebtoken';

export async function gerarToken(email: string, id: number) {
    if (!email || !Number.isInteger(id) || id <= 0) {
        throw new Error("E-mail ou identificador não encontrado, verifique as informações e tente novamente.");
    }
    const segredo = process.env.senhaSecreta;
    if (!segredo) {
        throw new Error("Chave secreta JWT não configurada.");
    }
    const token = jwt.sign(
        { email, id },
        process.env.senhaSecreta!,
        { expiresIn: "1h" }
    );
    if (!token) {
        throw new Error("Autenticador falhou, verifique as informações e tente novamente.");
    }
    return token
}

export async function verificarToken(token: string) {
    const segredo = process.env.senhaSecreta;
    if (!token) {
        throw new Error("Autenticador não informado, verifique as informações e tente novamente.")
    }
    if (!segredo) {
        throw new Error("Chave secreta JWT não configurada.");
    }
    const resultado = jwt.verify(token, segredo);
    if (!resultado) {
        throw new Error("Autenticação falhou, verifique as informações e tente novamente.");
    }
    return resultado;
}