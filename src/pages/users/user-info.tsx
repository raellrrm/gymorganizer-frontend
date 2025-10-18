import { getRelatorio } from "@/api/get-relatorio-pdf";
import { getUser } from "@/api/get-user";
import { registerPayment } from "@/api/register-payment";
import { Button } from "@/components/ui/button";
import { DialogHeader, DialogTitle, DialogContent, DialogDescription, Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { UserPaymentStatus } from "@/components/user-payment-status";
import { queryClient } from "@/lib/react-query";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { ChangePlan } from "./change-plan";

type UserInfoProps = {
    userId: number;
    openInfo: boolean;
};

export const UserInfo = ({ userId, openInfo }: UserInfoProps) => {

    const [open, setOpen] = useState(false);

    // Busca os dados do usuário com React Query
    const { data: user } = useQuery({
        queryKey: ["user", userId],
        queryFn: () => getUser({ userId }),
        enabled: openInfo
    });

    // Mutação para registrar o pagamento do usuário
    const { mutateAsync: registerPaymentFn } = useMutation({
        mutationFn: () => registerPayment({ userId }),
        onSuccess: () => {
            // Recarrega os dados relevantes após registrar pagamento
            queryClient.invalidateQueries({ queryKey: ["dashboard"] });
            queryClient.invalidateQueries({ queryKey: ["users"] });
            queryClient.invalidateQueries({ queryKey: ["user", userId] });
        },
    });

    const [isLoading, setIsLoading] = useState(false);

    // Função para registrar um novo pagamento
    const handleRegisterPayment = async () => {
        try {
            await registerPaymentFn({ userId });
            toast.success("Pagamento registrado com sucesso!");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            // Tratamento de erro com mensagens personalizadas
            const message = error.response?.data?.detail;
            const status = error.response?.status;

            if (status === 400 && message) toast.error(message);
            else toast.error("Erro ao registrar pagamento.");
        }
    };

    //  Função para baixar relatório de pagamento (PDF)
    const handleDownloadRelatorio = async () => {
        setIsLoading(true);
        try {
            await getRelatorio({ userId });
            toast.success("Relatório baixado com sucesso!");
        } catch (error) {
            console.error("Erro ao baixar o relatório:", error);
            toast.error("Erro ao baixar relatório.");
        } finally {
            setIsLoading(false);
        }
    };

    // Conversões de datas
    const created = new Date(user?.dataCriacao ?? ""); // Data de criação do usuário
    const dueDate = user?.dataVencimento
        ? new Date(`${user.dataVencimento}T00:00:00`)
        : null; // Data de vencimento

    // Formata CPF
    const formatCPF = (cpf?: string) =>
        cpf && cpf.length === 11
            ? cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
            : cpf;

    // 📱 Formata telefone no padrão BR
    const formatPhone = (phone?: string) =>
        phone
            ? phone.replace(/\D/g, "").replace(/(\d{2})(\d{4,5})(\d{4})/, "($1) $2-$3")
            : "";

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{user?.nome}</DialogTitle>
                <DialogDescription>ID: {user?.id}</DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell className="text-muted-foreground">Nome completo</TableCell>
                            <TableCell className="flex justify-end">
                                {user?.nome} {user?.sobrenome}
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell className="text-muted-foreground">CPF</TableCell>
                            <TableCell className="flex justify-end">
                                {formatCPF(user?.cpf)}
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell className="text-muted-foreground">Email</TableCell>
                            <TableCell className="flex justify-end">{user?.email}</TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell className="text-muted-foreground">Telefone</TableCell>
                            <TableCell className="flex justify-end">{formatPhone(user?.telefone)}</TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell className="text-muted-foreground">Status</TableCell>
                            <TableCell className="flex justify-end">
                                <UserPaymentStatus status={user?.statusAluno} />
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell className="text-muted-foreground">Data de matrícula</TableCell>
                            <TableCell className="flex justify-end">
                                {created.toLocaleDateString("pt-BR")}
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell className="text-muted-foreground">Plano Escolhido</TableCell>
                            <TableCell className="flex justify-end">
                                <b>
                                    {user?.plano.nome} –{" "}
                                    {user?.plano.valor.toLocaleString("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                    })}
                                </b>
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell className="text-muted-foreground">Vencimento do pagamento</TableCell>
                            <TableCell className="flex justify-end">
                                {dueDate?.toLocaleDateString("pt-BR") ?? "Sem data de vencimento"}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

                <div className="grid grid-cols-3 gap-2 pt-2">
                    <Button
                        onClick={handleRegisterPayment}
                        disabled={isLoading}
                        className="text-sm"
                    >
                        Registrar Pagamento
                    </Button>

                    <Button
                        variant="outline"
                        onClick={handleDownloadRelatorio}
                        disabled={isLoading}
                        className="text-sm"
                    >
                        Baixar Relatório
                    </Button>

                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="text-sm">
                                Mudar Plano
                            </Button>
                        </DialogTrigger>
                        <ChangePlan userId={userId} plan={user?.plano} onClose={() => setOpen(false)} />
                    </Dialog>
                </div>
            </div>
        </DialogContent>
    );
};
