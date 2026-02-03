import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { TrendingUp, TrendingDown, DollarSign, Clock, AlertTriangle, CheckCircle } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const kpiData = [
  { label: "Total AR", value: "₹18.5Cr", change: "+5.2%", trend: "up", icon: DollarSign },
  { label: "Current (0-30)", value: "₹13.9Cr", change: "+2.1%", trend: "up", icon: CheckCircle },
  { label: "Overdue (30+)", value: "₹4.7Cr", change: "-8.3%", trend: "down", icon: Clock },
  { label: "At Risk", value: "₹96L", change: "+12.4%", trend: "up", icon: AlertTriangle },
];

const collectionTrend = [
  { month: "Jan", collected: 6.3, outstanding: 1.4 },
  { month: "Feb", collected: 6.8, outstanding: 1.3 },
  { month: "Mar", collected: 7.0, outstanding: 1.1 },
  { month: "Apr", collected: 7.3, outstanding: 1.0 },
  { month: "May", collected: 7.5, outstanding: 0.9 },
  { month: "Jun", collected: 8.1, outstanding: 0.7 },
];

const agingData = [
  { name: "0-30 Days", value: 13.9, percentage: 75 },
  { name: "31-60 Days", value: 2.8, percentage: 15 },
  { name: "61-90 Days", value: 1.1, percentage: 6 },
  { name: "90+ Days", value: 0.7, percentage: 4 },
];

const COLORS = ["#10b981", "#f59e0b", "#ef4444", "#7f1d1d"];

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
                    <p className="text-2xl">{kpi.value}</p>
                    <div className="flex items-center gap-1">
                      {kpi.trend === "up" ? (
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-600" />
                      )}
                      <span
                        className={`text-sm ${
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
        {/* Collection Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Collection Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={collectionTrend}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-sm" />
                <YAxis className="text-sm" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar dataKey="collected" fill="#10b981" name="Collected (₹Cr)" radius={[8, 8, 0, 0]} />
                <Bar dataKey="outstanding" fill="#ef4444" name="Outstanding (₹Cr)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Invoice Aging */}
        <Card>
          <CardHeader>
            <CardTitle>Invoice Aging Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={agingData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) => `${name}: ${percentage}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {agingData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => `₹${value}Cr`}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AR Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle>30-Day AR Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart
              data={[
                { date: "Dec 1", current: 12.7, overdue: 5.2 },
                { date: "Dec 5", current: 13.1, overdue: 5.0 },
                { date: "Dec 10", current: 13.3, overdue: 4.9 },
                { date: "Dec 15", current: 13.5, overdue: 4.8 },
                { date: "Dec 20", current: 13.7, overdue: 4.8 },
                { date: "Dec 22", current: 13.9, overdue: 4.7 },
              ]}
            >
              <defs>
                <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="colorOverdue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="date" className="text-sm" />
              <YAxis className="text-sm" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
                formatter={(value: number) => `₹${value}Cr`}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="current"
                stroke="#10b981"
                fillOpacity={1}
                fill="url(#colorCurrent)"
                name="Current (₹Cr)"
              />
              <Area
                type="monotone"
                dataKey="overdue"
                stroke="#ef4444"
                fillOpacity={1}
                fill="url(#colorOverdue)"
                name="Overdue (₹Cr)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}