import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/api/get-users";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UserPaymentStatus } from "@/components/user-payment-status";

import { DollarSign, Edit, Trash } from "lucide-react";
import { EditUser } from "./edit-user";
import { DeleteUser } from "./delete-user";
import { useSearchParams } from "react-router";

export const UsersTable = () => {

     const [searchParams, setSearchParams] = useSearchParams();
    
        const cpf = searchParams.get('cpf');
        const status = searchParams.get('status');

    // Busca todos os usuários
    const { data: usuarios } = useQuery({
        queryKey: ["users", cpf, status],
        queryFn: () => getUsers({cpf,status: status === 'todos' ? null : status}),
    });

    // Controla o estado de abertura do modal de exclusão
    const [open, setOpen] = useState(false);

    return (
        <div className="max-h-[550px] overflow-y-auto border rounded-xl shadow-sm">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[80px]">ID</TableHead>
                        <TableHead>Nome</TableHead>
                        <TableHead>Sobrenome</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-center">Info/Pagamentos</TableHead>
                        <TableHead className="text-center">Editar</TableHead>
                        <TableHead className="text-center">Excluir</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {usuarios?.map((usuario) => (
                        <TableRow key={usuario.id}>
                            <TableCell className="font-medium">{usuario.id}</TableCell>
                            <TableCell>{usuario.nome}</TableCell>
                            <TableCell>{usuario.sobrenome}</TableCell>
                            <TableCell>
                                <UserPaymentStatus status={usuario.statusAluno} />
                            </TableCell>

                            <TableCell className="text-center">
                                <button
                                    className="rounded-full cursor-pointer bg-amber-500 p-2 hover:opacity-80 transition"
                                    title="Efetuar pagamento"
                                >
                                    <DollarSign size={14} className="text-white" />
                                </button>
                            </TableCell>

                            <TableCell className="text-center">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <button title="Editar usuário">
                                            <Edit className="text-emerald-500 hover:text-emerald-300 transition" />
                                        </button>
                                    </DialogTrigger>
                                    <EditUser userId={usuario.id} />
                                </Dialog>
                            </TableCell>

                            <TableCell className="text-center">
                                <Dialog open={open} onOpenChange={setOpen}>
                                    <DialogTrigger asChild>
                                        <button title="Excluir usuário">
                                            <Trash className="text-rose-600 hover:text-rose-400 transition" />
                                        </button>
                                    </DialogTrigger>
                                    <DeleteUser userId={usuario.id} onClose={() => setOpen(false)} />
                                </Dialog>
                            </TableCell>
                        </TableRow>
                    ))}

                    {usuarios?.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                                Nenhum usuário encontrado.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};
