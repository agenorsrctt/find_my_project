import jwt from 'jsonwebtoken';

export async function gerarToken(email: string, id: number) {
    console.log(process.env.senhaSecreta);

    const segredo = process.env.senhaSecreta;

    if (!segredo) {
        throw new Error("Chave secreta JWT não configurada.");
    }


    const token = jwt.sign(
        { email, id },
        process.env.senhaSecreta!,
        { expiresIn: "1h" }
    );
    return token
}

export async function verificarToken(token: string) {
    const resultado = jwt.verify(token, process.env.senhaSecreta!);
    return resultado;
}