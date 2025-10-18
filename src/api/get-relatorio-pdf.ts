// No seu arquivo de serviços da API (ex: /lib/api.ts)
import { api } from "@/lib/axios";

type getRelatorioProps = {
    userId: number;
}

export const getRelatorio = async ({ userId }: getRelatorioProps) => {
    const response = await api.get(`/relatorios/usuarios/${userId}/pagamentos`, {
        // Isso é crucial! Diz ao axios para tratar a resposta como dados binários.
        responseType: 'blob',
    });

    // Cria um URL temporário para o ficheiro descarregado
    const url = window.URL.createObjectURL(new Blob([response.data]));
    
    // Cria um link temporário para iniciar o download
    const link = document.createElement('a');
    link.href = url;
    
    // Define o nome do ficheiro que será descarregado
    link.setAttribute('download', `relatorio_pagamentos_${userId}.pdf`);
    
    // Adiciona o link ao corpo do documento e simula um clique
    document.body.appendChild(link);
    link.click();
    
    // Limpa, removendo o link e o URL temporário
    link.parentNode?.removeChild(link);
    window.URL.revokeObjectURL(url);
}