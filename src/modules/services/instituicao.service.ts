import { 
    criarInstituicaoRepository, 
    alterarInstituicaoRepository, 
    deletarInstituicaoRepository, 
    buscarInstituicaoRepository, 
    listarInstituicaoRepository
 } from "../repositories/instituicao.repository.js"



export async function criarInstituicaoService(nome: string) {

    if(!nome.trim()){
        throw new Error("Nome inválido, verifique as informações e tente novamente.")
    }

    nome = nome.toUpperCase();

    return await criarInstituicaoRepository(nome);
}

export async function alterarInstituicaoService(nome: string, id: number) {

    if(!nome.trim()){
        throw new Error("Nome inválido, verifique as informações e tente novamente.")
    }

    const instituicao = await buscarInstituicaoRepository(id);

    if(!instituicao) {
        throw new Error("Instituição não encontada, verifique as informações e tente novamente.")
    }


    return await alterarInstituicaoRepository(nome, id);

}

export async function deletarInstituicaoService(id: number) {

    if(id <= 0){
        throw new Error("Instituição não encontrada, verifique as informações e tente novamente.")
    }

    const instituicao = await buscarInstituicaoRepository(id);

    if(!instituicao) {
        throw new Error("Instituição não encontada, verifique as informações e tente novamente.")
    }


    return await deletarInstituicaoRepository(id);

}

export async function buscarInstituicaoService(id: number) {

    if(id <= 0){
        throw new Error("Instituição não encontrada, verifique as informações e tente novamente.")
    }

    const instituicao = await buscarInstituicaoRepository(id);

    if(!instituicao) {
        throw new Error("Instituição não encontada, verifique as informações e tente novamente.")
    }

    return instituicao;

}

export async function listarInstituicaoService() {

    const instituicoes = await listarInstituicaoRepository();

    if(instituicoes.length <= 0) {
        throw new Error("Nenhuma instituição encontrada até o momento, verifique as informações e tente novamente.")
    }

    return instituicoes;

}