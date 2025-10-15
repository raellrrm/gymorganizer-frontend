import { api } from "@/lib/axios"

type getUsersQuery = {
    cpf: string | null;
    status: string | null;
}

export type getUserResponse = {
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

export const getUsers = async ({cpf, status}: getUsersQuery) => {
    const response = await api.get<getUserResponse[]>("/usuarios", {
        params: {
            cpf,
            status
        }
    });
    return response.data;
}