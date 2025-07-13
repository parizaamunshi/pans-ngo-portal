import { Trophy, Star, TrendingUp, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";
import { MetricCard } from "./MetricCard";

// Sample leaderboard data
const leaderboardData = [
    {
        rank: 1,
        cluster: "Cluster A",
        rating: 4.9,
        totalOrders: 847,
        completedOrders: 823,
        avgResponseTime: "2.3 mins",
        customerSatisfaction: 98.5,
        performance: 97.2,
        trend: "up"
    },
    {
        rank: 2,
        cluster: "Cluster B",
        rating: 4.7,
        totalOrders: 692,
        completedOrders: 665,
        avgResponseTime: "3.1 mins",
        customerSatisfaction: 94.2,
        performance: 95.8,
        trend: "up"
    },
    {
        rank: 3,
        cluster: "Cluster C",
        rating: 4.5,
        totalOrders: 534,
        completedOrders: 498,
        avgResponseTime: "4.2 mins",
        customerSatisfaction: 89.7,
        performance: 93.1,
        trend: "stable"
    },
    {
        rank: 4,
        cluster: "Cluster D",
        rating: 4.2,
        totalOrders: 423,
        completedOrders: 387,
        avgResponseTime: "5.8 mins",
        customerSatisfaction: 85.3,
        performance: 88.4,
        trend: "down"
    }
];

const performanceMetrics = [
    {
        title: "Top Rated Cluster",
        value: "Cluster A",
        change: "4.9/5.0 rating",
        changeType: "positive" as const,
        icon: Trophy
    },
    {
        title: "Best Performance",
        value: "97.2%",
        change: "+2.1% this month",
        changeType: "positive" as const,
        icon: TrendingUp
    },
    {
        title: "Highest Satisfaction",
        value: "98.5%",
        change: "Cluster A leading",
        changeType: "positive" as const,
        icon: Star
    },
    {
        title: "Most Orders",
        value: "847",
        change: "Cluster A total",
        changeType: "neutral" as const,
        icon: Award
    }
];

const getRankBadge = (rank: number) => {
    const colors = {
        1: "bg-gradient-success text-success-foreground",
        2: "bg-gradient-warning text-warning-foreground",
        3: "bg-primary/10 text-primary"
    };
    return colors[rank as keyof typeof colors] || "bg-muted text-muted-foreground";
};

const getTrendIcon = (trend: string) => {
    switch (trend) {
        case "up": return "📈";
        case "down": return "📉";
        case "stable": return "➡️";
        default: return "➡️";
    }
};

export default function Leaderboard() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Cluster Performance Leaderboard</h1>
                <p className="text-muted-foreground">
                    Track and compare cluster performance based on customer feedback and metrics
                </p>
            </div>

            {/* Performance Metrics */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {performanceMetrics.map((metric, index) => (
                    <MetricCard key={index} {...metric} />
                ))}
            </div>

            {/* Leaderboard */}
            <Card className="bg-gradient-card shadow-strong">
                <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-2xl">
                        <Trophy className="h-6 w-6 text-primary" />
                        Cluster Performance Rankings
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {leaderboardData.map((cluster, index) => (
                        <div
                            key={cluster.cluster}
                            className={`relative p-6 rounded-xl border transition-all duration-300 hover:shadow-medium ${cluster.rank === 1
                                ? "bg-gradient-success/5 border-success/20 shadow-soft"
                                : "bg-background/50 border-border/50"
                                }`}
                        >
                            {/* Rank Badge */}
                            <div className="absolute -top-3 -left-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${getRankBadge(cluster.rank)}`}>
                                    {cluster.rank}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                                {/* Cluster Info */}
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xl font-bold">{cluster.cluster}</h3>
                                        <span className="text-lg">{getTrendIcon(cluster.trend)}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Star className="h-4 w-4 text-warning fill-warning" />
                                        <span className="text-lg font-semibold">{cluster.rating}</span>
                                        <span className="text-sm text-muted-foreground">/5.0</span>
                                    </div>
                                    <Badge className={getRankBadge(cluster.rank)}>
                                        Rank #{cluster.rank}
                                    </Badge>
                                </div>

                                {/* Performance Metrics */}
                                <div className="space-y-3">
                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span>Performance Score</span>
                                            <span className="font-medium">{cluster.performance}%</span>
                                        </div>
                                        <Progress value={cluster.performance} className="h-2" />
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span>Customer Satisfaction</span>
                                            <span className="font-medium">{cluster.customerSatisfaction}%</span>
                                        </div>
                                        <Progress value={cluster.customerSatisfaction} className="h-2" />
                                    </div>
                                </div>

                                {/* Order Statistics */}
                                <div className="space-y-3">
                                    <div>
                                        <span className="text-sm text-muted-foreground">Total Orders</span>
                                        <p className="text-2xl font-bold">{cluster.totalOrders}</p>
                                    </div>
                                    <div>
                                        <span className="text-sm text-muted-foreground">Completed</span>
                                        <p className="text-lg font-semibold text-success">{cluster.completedOrders}</p>
                                    </div>
                                </div>

                                {/* Response Time */}
                                <div className="space-y-3">
                                    <div>
                                        <span className="text-sm text-muted-foreground">Avg Response Time</span>
                                        <p className="text-2xl font-bold">{cluster.avgResponseTime}</p>
                                    </div>
                                    <div>
                                        <span className="text-sm text-muted-foreground">Completion Rate</span>
                                        <p className="text-lg font-semibold">
                                            {Math.round((cluster.completedOrders / cluster.totalOrders) * 100)}%
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Performance Insights */}
            <div className="grid gap-6 lg:grid-cols-2">
                <Card className="bg-gradient-card shadow-soft">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-primary" />
                            Top Performers
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-3">
                            <div className="flex justify-between items-center p-3 bg-success/5 border border-success/20 rounded-lg">
                                <span className="font-medium">Highest Rating</span>
                                <div className="text-right">
                                    <div className="font-bold">Cluster A</div>
                                    <div className="text-sm text-muted-foreground">4.9/5.0</div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-warning/5 border border-warning/20 rounded-lg">
                                <span className="font-medium">Fastest Response</span>
                                <div className="text-right">
                                    <div className="font-bold">Cluster A</div>
                                    <div className="text-sm text-muted-foreground">2.3 mins</div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-primary/5 border border-primary/20 rounded-lg">
                                <span className="font-medium">Most Improved</span>
                                <div className="text-right">
                                    <div className="font-bold">Cluster B</div>
                                    <div className="text-sm text-muted-foreground">+5.2% this month</div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-card shadow-soft">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Star className="h-5 w-5 text-primary" />
                            Customer Feedback Summary
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-3">
                            {leaderboardData.slice(0, 3).map((cluster) => (
                                <div key={cluster.cluster} className="flex justify-between items-center p-3 bg-background/50 border border-border/50 rounded-lg">
                                    <div>
                                        <div className="font-medium">{cluster.cluster}</div>
                                        <div className="text-sm text-muted-foreground">
                                            {cluster.customerSatisfaction}% satisfaction
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Star className="h-4 w-4 text-warning fill-warning" />
                                        <span className="font-bold">{cluster.rating}</span>
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