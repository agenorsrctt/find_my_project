import jwt from 'jsonwebtoken';

export function gerarToken(email: string, id: number) {
    const token = jwt.sign(
        {email, id},
        process.env.senhaSecreta!,
        {expiresIn: "1h"}
    );
    return token
}

export function verificarToken(token: string){
    const resultado = jwt.verify(token, process.env.senhaSecreta!);
    return resultado;
}