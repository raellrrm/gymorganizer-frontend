import { api } from "@/lib/axios";

type changePlanProps = {
    userId: number,
    plano: string;
}

export const changePlan  = async({userId,plano}: changePlanProps) => {
    const response = await api.put(`/usuarios/${userId}/plano`, {
        plano: Number(plano)
    });

    return response.data;
}