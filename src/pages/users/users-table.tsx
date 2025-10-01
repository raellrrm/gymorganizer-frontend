
import { getUsers } from "@/api/get-users";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UserPaymentStatus } from "@/components/user-payment-status";
import { useQuery } from "@tanstack/react-query";

import { DollarSign, InfoIcon } from "lucide-react";

export const UsersTable = () => {

    const {data: usuarios} = useQuery({
        queryKey: ['users'],
        queryFn: getUsers
    });

    return (
        <div className="max-h-[550px] overflow-y-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Id</TableHead>
                        <TableHead>Nome</TableHead>
                        <TableHead>Sobrenome</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Pagar</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {usuarios?.map(usuario => (
                        <TableRow key={usuario.id}>
                            <TableCell className="font-medium">{usuario.id}</TableCell>
                            <TableCell>{usuario.nome}</TableCell>
                            <TableCell>{usuario.sobrenome}</TableCell>
                            <TableCell className="text-right">
                                <UserPaymentStatus status={usuario.statusAluno} />
                            </TableCell>
                            <TableCell className="">
                                <button className="rounded-full bg-amber-500 inline-block p-2 hover:opacity-80 cursor-pointer">
                                    <DollarSign size={14} className="text-white text-sm" />
                                </button>
                            </TableCell>
                            <TableCell className="">
                                <button className="cursor-pointer">
                                    <InfoIcon />
                                </button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}