import { buscarEmailAlunoRepository } from "../repositories/usuario.repository.js"
import { compararHashSenha } from "../../middleware/bcrypt.middleware.js";
import { gerarToken } from "../../middleware/jwt.middleware.js";



export async function loginService(email: string, senha: string) { 
    
    if(!email || !senha){
        throw new Error("Dados inválidos, verifique e tente novamente.")
    }

    const aluno = await buscarEmailAlunoRepository(email);

    if(!aluno){
        throw new Error("Aluno não encontrado, verifique as informações e tente novamente.")
    }

    const senhaAluno = await compararHashSenha(senha, aluno.senha);

    if(!senhaAluno){
        throw new Error("Senha inválida, verifique as informações e tente novamente.")
    }

    const token = gerarToken(email, aluno.id);

    return token
}