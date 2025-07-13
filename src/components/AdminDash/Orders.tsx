import { useState } from "react";
import { Search, Filter, Eye, MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";

// Sample orders data
const ordersData = [
    {
        id: "#ORD-001",
        customer: "Alice Johnson",
        email: "alice@example.com",
        status: "Completed",
        amount: "$156.00",
        cluster: "Cluster A",
        date: "2024-01-15",
        items: 3
    },
    {
        id: "#ORD-002",
        customer: "Bob Smith",
        email: "bob@example.com",
        status: "In Progress",
        amount: "$298.50",
        cluster: "Cluster B",
        date: "2024-01-14",
        items: 5
    },
    {
        id: "#ORD-003",
        customer: "Carol Davis",
        email: "carol@example.com",
        status: "Pending",
        amount: "$89.75",
        cluster: "Cluster C",
        date: "2024-01-14",
        items: 2
    },
    {
        id: "#ORD-004",
        customer: "David Wilson",
        email: "david@example.com",
        status: "Completed",
        amount: "$445.20",
        cluster: "Cluster A",
        date: "2024-01-13",
        items: 7
    },
    {
        id: "#ORD-005",
        customer: "Emma Brown",
        email: "emma@example.com",
        status: "In Progress",
        amount: "$167.80",
        cluster: "Cluster D",
        date: "2024-01-13",
        items: 4
    },
    {
        id: "#ORD-006",
        customer: "Frank Miller",
        email: "frank@example.com",
        status: "Cancelled",
        amount: "$234.15",
        cluster: "Cluster B",
        date: "2024-01-12",
        items: 6
    },
    {
        id: "#ORD-007",
        customer: "Grace Lee",
        email: "grace@example.com",
        status: "Completed",
        amount: "$78.90",
        cluster: "Cluster C",
        date: "2024-01-12",
        items: 1
    },
    {
        id: "#ORD-008",
        customer: "Henry Clark",
        email: "henry@example.com",
        status: "Pending",
        amount: "$356.40",
        cluster: "Cluster A",
        date: "2024-01-11",
        items: 8
    }
];

const getStatusBadge = (status: string) => {
    const variants = {
        "Completed": "bg-success/10 text-success hover:bg-success/20",
        "In Progress": "bg-warning/10 text-warning hover:bg-warning/20",
        "Pending": "bg-primary/10 text-primary hover:bg-primary/20",
        "Cancelled": "bg-destructive/10 text-destructive hover:bg-destructive/20"
    };

    return variants[status as keyof typeof variants] || "bg-muted text-muted-foreground";
};

export default function Orders() {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const filteredOrders = ordersData.filter(order => {
        const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" || order.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Orders Management</h1>
                <p className="text-muted-foreground">
                    Track and manage all customer orders across different clusters
                </p>
            </div>

            {/* Filters */}
            <Card className="bg-gradient-card shadow-soft">
                <CardHeader>
                    <CardTitle>Filters</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search orders by customer, ID, or email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button className="gap-2">
                                    <Filter className="h-4 w-4" />
                                    Status: {statusFilter === "all" ? "All" : statusFilter}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                                    All Statuses
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setStatusFilter("Completed")}>
                                    Completed
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setStatusFilter("In Progress")}>
                                    In Progress
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setStatusFilter("Pending")}>
                                    Pending
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setStatusFilter("Cancelled")}>
                                    Cancelled
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </CardContent>
            </Card>

            {/* Orders Table */}
            <Card className="bg-gradient-card shadow-soft">
                <CardHeader>
                    <CardTitle>Orders ({filteredOrders.length})</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border border-border/50 overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/50">
                                    <TableHead>Order ID</TableHead>
                                    <TableHead>Customer</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Cluster</TableHead>
                                    <TableHead>Items</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead className="w-[70px]">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredOrders.map((order) => (
                                    <TableRow key={order.id} className="hover:bg-muted/30 transition-colors">
                                        <TableCell className="font-medium">{order.id}</TableCell>
                                        <TableCell>
                                            <div>
                                                <div className="font-medium">{order.customer}</div>
                                                <div className="text-sm text-muted-foreground">{order.email}</div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge className={getStatusBadge(order.status)}>
                                                {order.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="font-medium">{order.amount}</TableCell>
                                        <TableCell>
                                            <Badge>{order.cluster}</Badge>
                                        </TableCell>
                                        <TableCell>{order.items}</TableCell>
                                        <TableCell>{order.date}</TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button className="variant-ghost size-icon">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem className="gap-2">
                                                        <Eye className="h-4 w-4" />
                                                        View Details
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
