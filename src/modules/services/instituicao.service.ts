import { 
    criarInstituicaoRepository, 
    alterarInstituicaoRepository, 
    deletarInstituicaoRepository, 
    buscarInstituicaoRepository, 
    listarInstituicaoRepository
 } from "../repositories/instituicao.repository.js"

export async function criarInstituicaoService(nome: string) {
    if(!nome.trim()){
        throw new Error("Nome inválido, tente novamente.")
    }
    return await criarInstituicaoRepository(nome);
}

export async function alterarInstituicaoService(nome: string, id: number) {
    if(!nome.trim()){
        throw new Error("Nome inválido, tente novamente.")
    }
    return await alterarInstituicaoRepository(nome, id);
}

export async function deletarInstituicaoService(id: number) {
    if(id <= 0){
        throw new Error("Instituição não encontrada, tente novamente.")
    }
    return await deletarInstituicaoRepository(id);
}

export async function buscarInstituicaoService(id: number) {
    if(id <= 0){
        throw new Error("Instituição não encontrada, tente novamente.")
    }
    return await buscarInstituicaoRepository(id);
}

export async function listarInstituicaoService() {
    return await listarInstituicaoRepository();
}