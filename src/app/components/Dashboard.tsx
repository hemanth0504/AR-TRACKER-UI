import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { TrendingUp, TrendingDown, DollarSign, Clock, AlertTriangle, CheckCircle, User, Mail, Phone } from "lucide-react";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Line, LineChart } from "recharts";

const kpiData = [
  { label: "Total AR", value: "$18.5M", change: "+5.2%", trend: "up", icon: DollarSign },
  { label: "Current (0-30)", value: "$13.9M", change: "+2.1%", trend: "up", icon: CheckCircle },
  { label: "Overdue (30+)", value: "$4.7M", change: "-8.3%", trend: "down", icon: Clock },
  { label: "At Risk", value: "$960K", change: "+12.4%", trend: "up", icon: AlertTriangle },
];

// Top outstanding invoices requiring attention
const topOutstandingInvoices = [
  { invoiceNo: "INV-2024-1247", client: "MegaMart", amount: 340000, dueDate: "Oct 15, 2024", daysOverdue: 67, status: "overdue" },
  { invoiceNo: "INV-2024-1312", client: "TechStart Inc", amount: 280000, dueDate: "Nov 8, 2024", daysOverdue: 45, status: "overdue" },
  { invoiceNo: "INV-2024-1389", client: "RetailHub", amount: 180000, dueDate: "Nov 1, 2024", daysOverdue: 52, status: "overdue" },
  { invoiceNo: "INV-2024-1421", client: "BuildCo", amount: 160000, dueDate: "Nov 15, 2024", daysOverdue: 38, status: "overdue" },
  { invoiceNo: "INV-2024-1456", client: "Acme Corp", amount: 225000, dueDate: "Dec 1, 2024", daysOverdue: 22, status: "late" },
  { invoiceNo: "INV-2024-1489", client: "Global Trade", amount: 195000, dueDate: "Dec 10, 2024", daysOverdue: 13, status: "late" },
];

// Invoice aging distribution
const agingData = [
  { name: "0-30 Days", value: 13.9, percentage: 75, count: 45 },
  { name: "31-60 Days", value: 2.8, percentage: 15, count: 12 },
  { name: "60+ Days", value: 1.8, percentage: 10, count: 8 },
];

// DSO (Days Sales Outstanding) trend
const dsoTrend = [
  { month: "Jan", dso: 42 },
  { month: "Feb", dso: 39 },
  { month: "Mar", dso: 37 },
  { month: "Apr", dso: 35 },
  { month: "May", dso: 36 },
  { month: "Jun", dso: 34 },
];

// Top at-risk clients requiring follow-up
const atRiskClients = [
  { 
    name: "MegaMart", 
    amount: "$340K", 
    daysOverdue: 67, 
    riskScore: 85,
    lastContact: "3 days ago",
    nextAction: "Final notice"
  },
  { 
    name: "TechStart Inc", 
    amount: "$280K", 
    daysOverdue: 45, 
    riskScore: 65,
    lastContact: "1 week ago",
    nextAction: "Follow-up call"
  },
  { 
    name: "RetailHub", 
    amount: "$180K", 
    daysOverdue: 52, 
    riskScore: 70,
    lastContact: "2 days ago",
    nextAction: "Email reminder"
  },
  { 
    name: "BuildCo", 
    amount: "$160K", 
    daysOverdue: 38, 
    riskScore: 55,
    lastContact: "5 days ago",
    nextAction: "Payment plan"
  },
];

const COLORS = ["#10b981", "#f59e0b", "#ef4444"];

const getRiskColor = (score: number) => {
  if (score >= 70) return "text-red-600 bg-red-50";
  if (score >= 40) return "text-orange-600 bg-orange-50";
  return "text-green-600 bg-green-50";
};

const getRiskBadge = (score: number) => {
  if (score >= 70) return { label: "High", color: "bg-red-100 text-red-700" };
  if (score >= 40) return { label: "Medium", color: "bg-orange-100 text-orange-700" };
  return { label: "Low", color: "bg-green-100 text-green-700" };
};

const getStatusBadge = (status: string) => {
  if (status === "overdue") return { label: "Overdue", color: "bg-red-100 text-red-700" };
  if (status === "late") return { label: "Late", color: "bg-orange-100 text-orange-700" };
  return { label: "Due Soon", color: "bg-yellow-100 text-yellow-700" };
};

const formatCurrency = (amount: number) => {
  if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
  if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`;
  return `$${amount}`;
};

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">{kpi.label}</p>
                    <p className="text-2xl font-bold">{kpi.value}</p>
                    <div className="flex items-center gap-1">
                      {kpi.trend === "up" ? (
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-600" />
                      )}
                      <span
                        className={`text-sm font-medium ${
                          kpi.trend === "up" && kpi.label !== "At Risk"
                            ? "text-green-600"
                            : kpi.trend === "down" && kpi.label === "Overdue (30+)"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {kpi.change}
                      </span>
                    </div>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Outstanding Invoices */}
        <Card>
          <CardHeader>
            <CardTitle>Top Outstanding Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topOutstandingInvoices.map((invoice, index) => {
                const statusBadge = getStatusBadge(invoice.status);
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-mono text-sm font-semibold">{invoice.invoiceNo}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${statusBadge.color}`}>
                          {statusBadge.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="font-medium">{invoice.client}</span>
                        <span>•</span>
                        <span>Due: {invoice.dueDate}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">{formatCurrency(invoice.amount)}</p>
                      <p className="text-xs text-red-600 font-medium">{invoice.daysOverdue} days overdue</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Invoice Aging */}
        <Card>
          <CardHeader>
            <CardTitle>Invoice Aging Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Donut Chart */}
              <div className="relative flex items-center justify-center">
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie
                      data={agingData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={85}
                      paddingAngle={3}
                      dataKey="value"
                      label={({ percentage }) => `${percentage}%`}
                      labelLine={false}
                    >
                      {agingData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={COLORS[index % COLORS.length]}
                          stroke="hsl(var(--background))"
                          strokeWidth={2}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--background))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      }}
                      formatter={(value: number) => [`$${value}M`, 'Amount']}
                    />
                  </PieChart>
                </ResponsiveContainer>
                {/* Center Text */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center">
                    <p className="text-2xl font-bold">$18.5M</p>
                    <p className="text-xs text-muted-foreground">Total AR</p>
                  </div>
                </div>
              </div>

              {/* Custom Legend with Details */}
              <div className="space-y-2.5">
                {agingData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3.5 rounded-lg bg-accent/30 hover:bg-accent/50 transition-colors">
                    <div className="flex items-center gap-3 flex-1">
                      <div 
                        className="h-4 w-4 rounded-sm flex-shrink-0" 
                        style={{ backgroundColor: COLORS[index] }}
                      />
                      <span className="text-sm font-medium min-w-[90px]">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-8 text-sm">
                      <div className="text-center min-w-[60px]">
                        <p className="font-semibold text-base">{item.count}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">invoices</p>
                      </div>
                      <div className="text-right min-w-[70px]">
                        <p className="font-bold text-base">${item.value}M</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{item.percentage}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                <div className="text-center py-4">
                  <p className="text-xl font-bold text-green-600">75%</p>
                  <p className="text-xs text-muted-foreground mt-1">Current</p>
                </div>
                <div className="text-center border-x py-1">
                  <p className="text-xl font-bold text-orange-600">15%</p>
                  <p className="text-xs text-muted-foreground mt-1">31-60 Days</p>
                </div>
                <div className="text-center py-0">
                  <p className="text-xl font-bold text-red-600">10%</p>
                  <p className="text-xs text-muted-foreground mt-1">60+ Days</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* DSO Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Days Sales Outstanding (DSO) Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={dsoTrend}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="month" className="text-sm" />
              <YAxis className="text-sm" label={{ value: 'Days', angle: -90, position: 'insideLeft' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
                formatter={(value: number) => `${value} days`}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="dso"
                stroke="#3b82f6"
                strokeWidth={2}
                name="DSO (Days)"
                dot={{ fill: '#3b82f6', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* At-Risk Clients - Follow-up Required */}
      <Card>
        <CardHeader>
          <CardTitle>At-Risk Clients - Follow-up Required</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {atRiskClients.map((client, index) => {
              const risk = getRiskBadge(client.riskScore);
              return (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold">{client.name}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${risk.color}`}>
                          {risk.label} Risk
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="font-medium text-red-600">{client.amount}</span>
                        <span>•</span>
                        <span>{client.daysOverdue} days overdue</span>
                        <span>•</span>
                        <span>Last contact: {client.lastContact}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right mr-4">
                      <p className="text-sm font-medium text-primary">{client.nextAction}</p>
                      <p className="text-xs text-muted-foreground">Next action</p>
                    </div>
                    <button className="p-2 hover:bg-accent rounded-lg transition-colors">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                    </button>
                    <button className="p-2 hover:bg-accent rounded-lg transition-colors">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}