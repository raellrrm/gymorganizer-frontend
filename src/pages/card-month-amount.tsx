import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign } from "lucide-react"

export const CardMonthAmount = () => {
    return (
        <Card className="col-span-2 md:col-span-1">
            <CardHeader className="flex justify-between">
                <CardTitle className="font-semibold text-lg md:text-2xl">Receita do mês</CardTitle>
                <DollarSign />
            </CardHeader>
            <CardContent className="flex items-center">
                <span className="font-medium ml-4 text-2xl md:text-3xl">R$ 229,00</span>
            </CardContent>
        </Card>
    )
}