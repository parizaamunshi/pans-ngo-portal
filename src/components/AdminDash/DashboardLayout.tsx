import { ShoppingCart, Package, Clock, CheckCircle } from "lucide-react";
import { MetricCard } from "./MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";

// Sample data
const metrics = [
    {
        title: "Total Orders",
        value: "2,847",
        change: "+12.3% from last month",
        changeType: "positive" as const,
        icon: ShoppingCart
    },
    {
        title: "Pending Orders",
        value: "156",
        change: "-8.1% from yesterday",
        changeType: "positive" as const,
        icon: Clock
    },
    {
        title: "Completed Orders",
        value: "2,691",
        change: "+15.2% this week",
        changeType: "positive" as const,
        icon: CheckCircle
    },
    {
        title: "In Progress",
        value: "94",
        change: "+2.4% today",
        changeType: "positive" as const,
        icon: Package
    }
];

const orderStatusData = [
    { status: "Completed", count: 2691, percentage: 94.5, color: "bg-gradient-success" },
    { status: "In Progress", count: 94, percentage: 3.3, color: "bg-gradient-warning" },
    { status: "Pending", count: 62, percentage: 2.2, color: "bg-gradient-primary" }
];

const recentOrders = [
    { id: "#ORD-001", customer: "Alice Johnson", status: "Completed", amount: "$156.00", cluster: "Cluster A" },
    { id: "#ORD-002", customer: "Bob Smith", status: "In Progress", amount: "$298.50", cluster: "Cluster B" },
    { id: "#ORD-003", customer: "Carol Davis", status: "Pending", amount: "$89.75", cluster: "Cluster C" },
    { id: "#ORD-004", customer: "David Wilson", status: "Completed", amount: "$445.20", cluster: "Cluster A" },
    { id: "#ORD-005", customer: "Emma Brown", status: "In Progress", amount: "$167.80", cluster: "Cluster D" }
];

export default function Dashboard() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
                <p className="text-muted-foreground">
                    Monitor your orders and cluster performance in real-time
                </p>
            </div>

            {/* Metrics Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {metrics.map((metric, index) => (
                    <MetricCard key={index} {...metric} />
                ))}
            </div>

            {/* Charts and Data */}
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Order Status Distribution */}
                <Card className="bg-gradient-card shadow-soft">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Package className="h-5 w-5 text-primary" />
                            Order Status Distribution
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {orderStatusData.map((item) => (
                            <div key={item.status} className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="font-medium">{item.status}</span>
                                    <span className="text-muted-foreground">{item.count} orders</span>
                                </div>
                                <div className="relative">
                                    <Progress value={item.percentage} className="h-2" />
                                    <div
                                        className={`absolute top-0 left-0 h-2 rounded-full ${item.color} transition-all duration-500`}
                                        style={{ width: `${item.percentage}%` }}
                                    />
                                </div>
                                <div className="text-right text-xs text-muted-foreground">
                                    {item.percentage}%
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Recent Orders */}
                <Card className="bg-gradient-card shadow-soft">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <ShoppingCart className="h-5 w-5 text-primary" />
                            Recent Orders
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentOrders.map((order) => (
                                <div key={order.id} className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/50">
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium">{order.id}</p>
                                        <p className="text-xs text-muted-foreground">{order.customer}</p>
                                        <p className="text-xs text-muted-foreground">{order.cluster}</p>
                                    </div>
                                    <div className="text-right space-y-1">
                                        <p className="text-sm font-medium">{order.amount}</p>
                                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${order.status === "Completed"
                                            ? "bg-success/10 text-success"
                                            : order.status === "In Progress"
                                                ? "bg-warning/10 text-warning"
                                                : "bg-primary/10 text-primary"
                                            }`}>
                                            {order.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}