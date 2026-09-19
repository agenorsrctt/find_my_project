


export async function login(id: number, email: string, senha: string) { 
    
    if(!id || !email || !senha){
        throw new Error("Dados inválidos, verifique e tente novamente.")
    }

}