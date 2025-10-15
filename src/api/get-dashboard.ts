import { api } from "@/lib/axios"

type getDashboardProps = {
    totalAlunosAtivos: number;
    totalAlunosPendentes: number;
    receitaDoMes: number;
}

export const getDashboard = async() => {
    const response = await api.get<getDashboardProps>("/dashboard");
    return response.data;
}