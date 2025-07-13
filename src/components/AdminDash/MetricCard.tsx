import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
    title: string;
    value: string | number;
    change?: string;
    changeType?: "positive" | "negative" | "neutral";
    icon: LucideIcon;
    className?: string;
}

export function MetricCard({
    title,
    value,
    change,
    changeType = "neutral",
    icon: Icon,
    className
}: MetricCardProps) {
    return (
        <Card className={cn("bg-gradient-card shadow-soft hover:shadow-medium transition-all duration-300", className)}>
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">{title}</p>
                        <p className="text-3xl font-bold tracking-tight">{value}</p>
                        {change && (
                            <p className={cn(
                                "text-sm font-medium",
                                changeType === "positive" && "text-success",
                                changeType === "negative" && "text-destructive",
                                changeType === "neutral" && "text-muted-foreground"
                            )}>
                                {change}
                            </p>
                        )}
                    </div>
                    <div className="rounded-full bg-gradient-primary p-3 shadow-soft">
                        <Icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}