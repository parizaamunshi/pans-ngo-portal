import { Settings2, Bell, Users, Database, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Separator } from "../ui/separator";

export default function Settings() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground">
                    Manage your dashboard preferences and system configuration
                </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Notification Settings */}
                <Card className="bg-gradient-card shadow-soft">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Bell className="h-5 w-5 text-primary" />
                            Notifications
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label className="text-base">Order Updates</Label>
                                <p className="text-sm text-muted-foreground">
                                    Get notified when order status changes
                                </p>
                            </div>
                            <Switch defaultChecked />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label className="text-base">Performance Alerts</Label>
                                <p className="text-sm text-muted-foreground">
                                    Alerts for cluster performance issues
                                </p>
                            </div>
                            <Switch defaultChecked />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label className="text-base">Daily Reports</Label>
                                <p className="text-sm text-muted-foreground">
                                    Receive daily performance summaries
                                </p>
                            </div>
                            <Switch />
                        </div>
                    </CardContent>
                </Card>

                {/* User Management */}
                <Card className="bg-gradient-card shadow-soft">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users className="h-5 w-5 text-primary" />
                            User Management
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="admin-name">Admin Name</Label>
                            <Input id="admin-name" defaultValue="Admin User" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="admin-email">Email</Label>
                            <Input id="admin-email" type="email" defaultValue="admin@company.com" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="timezone">Timezone</Label>
                            <Input id="timezone" defaultValue="UTC-05:00 (EST)" />
                        </div>
                        <Button className="w-full">Update Profile</Button>
                    </CardContent>
                </Card>

                {/* System Settings */}
                <Card className="bg-gradient-card shadow-soft">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Settings2 className="h-5 w-5 text-primary" />
                            System Configuration
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label className="text-base">Auto-refresh Dashboard</Label>
                                <p className="text-sm text-muted-foreground">
                                    Automatically refresh data every 30 seconds
                                </p>
                            </div>
                            <Switch defaultChecked />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label className="text-base">Dark Mode</Label>
                                <p className="text-sm text-muted-foreground">
                                    Switch to dark theme
                                </p>
                            </div>
                            <Switch />
                        </div>
                        <Separator />
                        <div className="space-y-2">
                            <Label htmlFor="refresh-interval">Refresh Interval (seconds)</Label>
                            <Input id="refresh-interval" type="number" defaultValue="30" />
                        </div>
                    </CardContent>
                </Card>

                {/* Data & Privacy */}
                <Card className="bg-gradient-card shadow-soft">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Shield className="h-5 w-5 text-primary" />
                            Data & Privacy
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <h4 className="text-sm font-medium">Data Retention</h4>
                            <p className="text-sm text-muted-foreground">
                                Order data is retained for 12 months for analytics purposes.
                            </p>
                        </div>
                        <Separator />
                        <div className="space-y-2">
                            <h4 className="text-sm font-medium">Export Data</h4>
                            <p className="text-sm text-muted-foreground">
                                Download your dashboard data in CSV format.
                            </p>
                            <Button className="border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 px-3 rounded-md text-sm">
                                Export All Data
                            </Button>
                        </div>
                        <Separator />
                        <div className="space-y-2">
                            <h4 className="text-sm font-medium">Reset Dashboard</h4>
                            <p className="text-sm text-muted-foreground">
                                Clear all data and reset to default settings.
                            </p>
                            <Button className="bg-destructive text-destructive-foreground hover:bg-destructive/90 h-8 px-3 rounded-md text-sm">
                                Reset Dashboard
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Database Status */}
            <Card className="bg-gradient-card shadow-soft">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Database className="h-5 w-5 text-primary" />
                        System Status
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-3">
                        <div className="flex items-center justify-between p-4 bg-success/5 border border-success/20 rounded-lg">
                            <div>
                                <p className="text-sm font-medium">Database</p>
                                <p className="text-xs text-muted-foreground">Connection Status</p>
                            </div>
                            <div className="text-success font-medium">Online</div>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-success/5 border border-success/20 rounded-lg">
                            <div>
                                <p className="text-sm font-medium">API</p>
                                <p className="text-xs text-muted-foreground">Service Status</p>
                            </div>
                            <div className="text-success font-medium">Active</div>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-warning/5 border border-warning/20 rounded-lg">
                            <div>
                                <p className="text-sm font-medium">Sync</p>
                                <p className="text-xs text-muted-foreground">Last Updated</p>
                            </div>
                            <div className="text-warning font-medium">2 min ago</div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}