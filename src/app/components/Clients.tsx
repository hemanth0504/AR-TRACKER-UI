import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { 
  Search, 
  TrendingUp, 
  TrendingDown, 
  User, 
  DollarSign, 
  Clock, 
  AlertTriangle,
  Filter,
  ArrowUpDown
} from "lucide-react";
import { useState } from "react";

// Client data with payment behavior and risk analysis
const clientsData = [
  {
    id: 1,
    name: "MegaMart",
    outstandingBalance: 340000,
    avgDaysLate: 45,
    riskScore: 85,
    riskLevel: "High",
    totalInvoices: 12,
    paidOnTime: 3,
    paymentTrend: "down",
    lastPayment: "Nov 8, 2024",
    contact: "John Smith",
  },
  {
    id: 2,
    name: "TechStart Inc",
    outstandingBalance: 280000,
    avgDaysLate: 32,
    riskScore: 65,
    riskLevel: "Medium",
    totalInvoices: 15,
    paidOnTime: 8,
    paymentTrend: "down",
    lastPayment: "Nov 15, 2024",
    contact: "Sarah Johnson",
  },
  {
    id: 3,
    name: "Acme Corp",
    outstandingBalance: 225000,
    avgDaysLate: 12,
    riskScore: 25,
    riskLevel: "Low",
    totalInvoices: 18,
    paidOnTime: 16,
    paymentTrend: "up",
    lastPayment: "Dec 18, 2024",
    contact: "Mike Davis",
  },
  {
    id: 4,
    name: "RetailHub",
    outstandingBalance: 180000,
    avgDaysLate: 52,
    riskScore: 70,
    riskLevel: "High",
    totalInvoices: 10,
    paidOnTime: 4,
    paymentTrend: "down",
    lastPayment: "Oct 28, 2024",
    contact: "Emily Chen",
  },
  {
    id: 5,
    name: "BuildCo",
    outstandingBalance: 160000,
    avgDaysLate: 28,
    riskScore: 55,
    riskLevel: "Medium",
    totalInvoices: 14,
    paidOnTime: 9,
    paymentTrend: "stable",
    lastPayment: "Nov 20, 2024",
    contact: "Robert Wilson",
  },
  {
    id: 6,
    name: "Global Trade",
    outstandingBalance: 195000,
    avgDaysLate: 8,
    riskScore: 15,
    riskLevel: "Low",
    totalInvoices: 20,
    paidOnTime: 19,
    paymentTrend: "up",
    lastPayment: "Dec 20, 2024",
    contact: "Lisa Anderson",
  },
  {
    id: 7,
    name: "SupplyChain Pro",
    outstandingBalance: 145000,
    avgDaysLate: 18,
    riskScore: 35,
    riskLevel: "Low",
    totalInvoices: 16,
    paidOnTime: 13,
    paymentTrend: "stable",
    lastPayment: "Dec 5, 2024",
    contact: "David Brown",
  },
  {
    id: 8,
    name: "Quantum Corp",
    outstandingBalance: 320000,
    avgDaysLate: 5,
    riskScore: 10,
    riskLevel: "Low",
    totalInvoices: 22,
    paidOnTime: 21,
    paymentTrend: "up",
    lastPayment: "Dec 22, 2024",
    contact: "Jennifer Lee",
  },
];

const getRiskBadge = (level: string) => {
  switch (level) {
    case "High":
      return { variant: "destructive" as const, icon: "🔴" };
    case "Medium":
      return { variant: "default" as const, icon: "🟡" };
    case "Low":
      return { variant: "secondary" as const, icon: "🟢" };
    default:
      return { variant: "outline" as const, icon: "⚪" };
  }
};

const formatCurrency = (amount: number) => {
  if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
  if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`;
  return `$${amount}`;
};

const getPaymentTrendIcon = (trend: string) => {
  if (trend === "up") return <TrendingUp className="h-4 w-4 text-green-600" />;
  if (trend === "down") return <TrendingDown className="h-4 w-4 text-red-600" />;
  return <ArrowUpDown className="h-4 w-4 text-gray-400" />;
};

export function Clients() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRisk, setFilterRisk] = useState<string>("All");

  const filteredClients = clientsData.filter((client) => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterRisk === "All" || client.riskLevel === filterRisk;
    return matchesSearch && matchesFilter;
  });

  // Summary stats
  const totalOutstanding = clientsData.reduce((sum, client) => sum + client.outstandingBalance, 0);
  const highRiskCount = clientsData.filter((c) => c.riskLevel === "High").length;
  const avgDaysLate = Math.round(
    clientsData.reduce((sum, client) => sum + client.avgDaysLate, 0) / clientsData.length
  );

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Clients</p>
                <p className="text-2xl font-bold">{clientsData.length}</p>
              </div>
              <User className="h-8 w-8 text-primary opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Outstanding</p>
                <p className="text-2xl font-bold">{formatCurrency(totalOutstanding)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-primary opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Days Late</p>
                <p className="text-2xl font-bold">{avgDaysLate}</p>
              </div>
              <Clock className="h-8 w-8 text-primary opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">High Risk Clients</p>
                <p className="text-2xl font-bold">{highRiskCount}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600 opacity-50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <CardTitle>Client List</CardTitle>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search clients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 w-full sm:w-64"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setFilterRisk("All")}
                  className={`px-3 py-2 text-sm rounded-md transition-colors ${
                    filterRisk === "All"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilterRisk("High")}
                  className={`px-3 py-2 text-sm rounded-md transition-colors ${
                    filterRisk === "High"
                      ? "bg-red-600 text-white"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  High Risk
                </button>
                <button
                  onClick={() => setFilterRisk("Medium")}
                  className={`px-3 py-2 text-sm rounded-md transition-colors ${
                    filterRisk === "Medium"
                      ? "bg-orange-600 text-white"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  Medium
                </button>
                <button
                  onClick={() => setFilterRisk("Low")}
                  className={`px-3 py-2 text-sm rounded-md transition-colors ${
                    filterRisk === "Low"
                      ? "bg-green-600 text-white"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  Low Risk
                </button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredClients.map((client) => {
              const risk = getRiskBadge(client.riskLevel);
              const onTimePercent = Math.round((client.paidOnTime / client.totalInvoices) * 100);

              return (
                <div
                  key={client.id}
                  className="flex flex-col lg:flex-row lg:items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors gap-4"
                >
                  {/* Client Info */}
                  <div className="flex items-center gap-4 flex-1">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-lg">{client.name}</h3>
                        <Badge variant={risk.variant}>
                          {risk.icon} {client.riskLevel} Risk
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Contact: {client.contact}
                      </p>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                    {/* Outstanding Balance */}
                    <div className="text-left lg:text-center">
                      <p className="text-xs text-muted-foreground mb-1">Outstanding</p>
                      <p className="text-lg font-bold">{formatCurrency(client.outstandingBalance)}</p>
                    </div>

                    {/* Average Days Late */}
                    <div className="text-left lg:text-center">
                      <p className="text-xs text-muted-foreground mb-1">Avg Days Late</p>
                      <div className="flex items-center gap-1 justify-start lg:justify-center">
                        <p className={`text-lg font-bold ${
                          client.avgDaysLate > 30 ? "text-red-600" :
                          client.avgDaysLate > 15 ? "text-orange-600" :
                          "text-green-600"
                        }`}>
                          {client.avgDaysLate}
                        </p>
                        <span className="text-sm text-muted-foreground">days</span>
                      </div>
                    </div>

                    {/* Risk Score */}
                    <div className="text-left lg:text-center">
                      <p className="text-xs text-muted-foreground mb-1">Risk Score</p>
                      <div className="flex items-center gap-2 justify-start lg:justify-center">
                        <p className="text-lg font-bold">{client.riskScore}</p>
                        <span className="text-xs text-muted-foreground">/100</span>
                      </div>
                    </div>

                    {/* Payment History */}
                    <div className="text-left lg:text-center">
                      <p className="text-xs text-muted-foreground mb-1">On-Time Rate</p>
                      <div className="flex items-center gap-1 justify-start lg:justify-center">
                        <p className="text-lg font-bold">{onTimePercent}%</p>
                        {getPaymentTrendIcon(client.paymentTrend)}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredClients.length === 0 && (
            <div className="text-center py-12">
              <User className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground">No clients found matching your criteria</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}