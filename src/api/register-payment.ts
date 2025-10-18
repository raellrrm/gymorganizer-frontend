import { api } from "@/lib/axios";

type registerPayementProps = {
    userId: number;
}

export const registerPayment = async({userId}: registerPayementProps) => {
    const response = await api.post(`/usuarios/${userId}/pagamento`, {
        userId
    });

    return response.data;
}