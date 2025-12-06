import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  description: string;
  className?: string;
}

export default function StatCard({
  title,
  value,
  icon,
  className,
  description,
}: StatCardProps) {
  return (
    <Card className={cn("border-none", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-white/80">{description}</p>
      </CardContent>
    </Card>
  );
}
