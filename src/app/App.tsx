import { useState } from "react";
import { Dashboard } from "./components/Dashboard";
import {Clients} from "./components/Clients";
import { InvoiceList } from "./components/InvoiceList";
import {Reminders} from "./components/Reminders";

import { Button } from "./components/ui/button";
import {
  LayoutDashboard,
  FileText,
  Brain,
  Workflow,
  DollarSign,
  TrendingUp,
  Bell,
  Settings,
  Search,
  User,
  Upload,
} from "lucide-react";
import { Input } from "./components/ui/input";
import { Badge } from "./components/ui/badge";

type NavItem = {
  id: string;
  label: string;
  icon: any;
};

const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "invoices", label: "Invoices", icon: FileText },
  { id: "reminders", label: "Reminders", icon: Bell },
  { id: "clients", label: "Clients", icon: Upload },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "invoices":
        return <InvoiceList />;
      case "reminders":
        return <Reminders />;
      case "clients":
        return <Clients />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Top Navigation Bar */}
      <header className="border-b bg-card">
        <div className="flex items-center justify-between h-16 px-6">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-semibold">SpendIQ</h1>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search invoices, customers..."
                className="pl-9 w-[300px]"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                3
              </Badge>
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2 ml-2 pl-2 border-l">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-4 w-4 text-primary" />
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium">4A User</p>
                <p className="text-xs text-muted-foreground">AR Manager</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Side Navigation */}
        <aside className="w-64 border-r bg-card hidden md:block">
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? "default" : "ghost"}
                  className="w-full justify-start gap-3"
                  onClick={() => setActiveTab(item.id)}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Button>
              );
            })}
          </nav>
          
          {/* Quick Stats in Sidebar */}
          <div className="p-4 mt-6 space-y-3 border-t">
            <p className="text-xs font-medium text-muted-foreground">QUICK STATS</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Open Invoices</span>
                <span className="font-medium">248</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Overdue</span>
                <span className="font-medium text-red-600">34</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Collections Today</span>
                <span className="font-medium text-green-600">$100K</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            {/* Page Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold">
                {navItems.find((item) => item.id === activeTab)?.label}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {activeTab === "dashboard" && "Overview of your accounts receivable performance"}
                {activeTab === "ingestion" && "Upload and process invoices"}
                {activeTab === "invoices" && "Manage and track all outstanding invoices"}
                {activeTab === "ai-insights" &&
                  "AI-powered insights and risk analysis for better decision making"}
                {activeTab === "collections" &&
                  "Automated workflows and collection strategies"}
                {activeTab === "cash-app" &&
                  "AI-assisted payment matching and cash application"}
                {activeTab === "analytics" &&
                  "Predictive analytics and forecasting for AR optimization"}
              </p>
            </div>

            {/* Dynamic Content */}
            {renderContent()}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden border-t bg-card">
        <nav className="flex items-center justify-around p-2">
          {navItems.slice(0, 5).map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                size="sm"
                className="flex-col h-auto py-2"
                onClick={() => setActiveTab(item.id)}
              >
                <Icon className="h-4 w-4" />
                <span className="text-xs mt-1">{item.label.split(" ")[0]}</span>
              </Button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}