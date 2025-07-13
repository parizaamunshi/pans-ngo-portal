import { useState } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    ShoppingCart,
    Trophy,
    Settings,
    Menu,
    X
} from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";

const navigation = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Orders", href: "/orders", icon: ShoppingCart },
    { name: "Leaderboard", href: "/leaderboard", icon: Trophy },
    { name: "Settings", href: "/settings", icon: Settings },
];

export function DashboardLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();

    return (
        <div className="min-h-screen bg-background">
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={cn(
                "fixed inset-y-0 left-0 z-50 w-64 transform bg-gradient-card shadow-strong transition-transform duration-300 ease-in-out lg:translate-x-0",
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="flex h-full flex-col">
                    {/* Logo */}
                    <div className="flex h-16 items-center justify-between px-6 border-b border-border">
                        <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                            Admin Dashboard
                        </h1>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="lg:hidden"
                            onClick={() => setSidebarOpen(false)}
                        >
                            <X className="h-5 w-5" />
                        </Button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-2 px-4 py-6">
                        {navigation.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.href;

                            return (
                                <NavLink
                                    key={item.name}
                                    to={item.href}
                                    className={cn(
                                        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                                        isActive
                                            ? "bg-gradient-primary text-primary-foreground shadow-soft"
                                            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                    )}
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    <Icon className="h-4 w-4" />
                                    {item.name}
                                </NavLink>
                            );
                        })}
                    </nav>
                </div>
            </div>

            {/* Main content */}
            <div className="lg:pl-64">
                {/* Top bar */}
                <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border">
                    <div className="flex h-16 items-center justify-between px-6">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="lg:hidden"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <Menu className="h-5 w-5" />
                        </Button>

                        <div className="flex items-center gap-4">
                            <div className="text-sm text-muted-foreground">
                                Welcome back, Admin
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}