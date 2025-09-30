
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UserPaymentStatus } from "@/components/user-payment-status";

import { DollarSign, InfoIcon } from "lucide-react";

export const UsersTable = () => {



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
                    {Array.from({ length: 9 }).map((_, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">2</TableCell>
                            <TableCell>Usuario</TableCell>
                            <TableCell>Sobrenome</TableCell>
                            <TableCell className="text-right">
                                <UserPaymentStatus status="ATIVO" />
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