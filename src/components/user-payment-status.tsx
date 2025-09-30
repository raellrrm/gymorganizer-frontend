type StatusProps = {
    status: string;
}
export const UserPaymentStatus = ({ status }: StatusProps) => {
    return (
        <div className="flex items-center">
            {status === "PENDENTE" && 
                 <div className="w-2 h-2 rounded-full bg-amber-500"></div>
            }

            {status === 'ATIVO' && 
                 <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
            }
    
            {status === 'INATIVO' && 
                 <div className="w-2 h-2 rounded-full bg-red-500"></div>
            }
           
            <span className="ml-2 font-medium">{status}</span>
        </div>
    );
}