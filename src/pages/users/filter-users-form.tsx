import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const FilterUsersForm = () => {
    return (
        <form className="space-y-4 flex md:flex-col gap-2" action="">
            <Input placeholder="buscar por CPF" />
                <Select>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder={"Status"}/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Ativo">Ativo</SelectItem>
                        <SelectItem value="Inativo">Inativo</SelectItem>
                    </SelectContent>
                </Select>
            <Button className="md:w-full cursor-pointer bg-foreground">Filtrar</Button>
        </form>
    );
}