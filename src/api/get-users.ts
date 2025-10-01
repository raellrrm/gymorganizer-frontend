import { api } from "@/lib/axios"

type getUsersResponse = {
    id: 1,
    nome: string,
    sobrenome: string,
    email: string,
    telefone: string,
    cpf: string,
    statusAluno: string,
    plano: {
        id: number,
        nome: string,
        valor:number,
        duracaoEmDias: number
    },
    dataVencimento: string
}

export const getUsers = async () => {
    const response = await api.get<getUsersResponse[]>("/usuarios");
    return response.data;
}