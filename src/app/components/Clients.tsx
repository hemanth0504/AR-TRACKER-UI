import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import {
  Search,
  User,
  DollarSign,
  Clock,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  ArrowUpDown,
} from "lucide-react";

/* -----------------------------
   Types
------------------------------ */

type RiskLevel = "High" | "Medium" | "Low";

interface Client {
  id: number;
  name: string;
  outstandingBalance: number;
  avgDaysLate: number;
  riskScore: number;
  riskLevel: RiskLevel;
  totalInvoices: number;
  paidOnTime: number;
  paymentTrend: "up" | "down" | "stable";
  lastPayment: string;
  contact: string;
}

/* -----------------------------
   Mock Client Data
------------------------------ */

const clientsData: Client[] = [
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
    lastPayment: "2024-11-08",
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
    lastPayment: "2024-11-15",
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
    lastPayment: "2024-12-18",
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
    lastPayment: "2024-10-28",
    contact: "Emily Chen",
  },
];

/* -----------------------------
   Helpers
------------------------------ */

const formatCurrency = (amount: number) =>
  `$${amount.toLocaleString()}`;

const getRiskBadge = (level: RiskLevel) => {
  if (level === "High") return <Badge variant="destructive">High Risk</Badge>;
  if (level === "Medium") return <Badge className="bg-orange-500">Medium Risk</Badge>;
  return <Badge className="bg-green-500">Low Risk</Badge>;
};

const getTrendIcon = (trend: Client["paymentTrend"]) => {
  if (trend === "up") return <TrendingUp className="h-4 w-4 text-green-600" />;
  if (trend === "down") return <TrendingDown className="h-4 w-4 text-red-600" />;
  return <ArrowUpDown className="h-4 w-4 text-muted-foreground" />;
};

/* -----------------------------
   Client Detail Page
------------------------------ */

function ClientDetail({
  client,
  onBack,
}: {
  client: Client;
  onBack: () => void;
}) {
  const onTimeRate = Math.round(
    (client.paidOnTime / client.totalInvoices) * 100
  );

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="text-sm text-muted-foreground hover:underline"
      >
        ← Back to Clients
      </button>

      {/* Overview */}
      <Card>
        <CardHeader>
          <CardTitle>{client.name}</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Risk Level</p>
            {getRiskBadge(client.riskLevel)}
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Outstanding</p>
            <p className="font-semibold">{formatCurrency(client.outstandingBalance)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Avg Days Late</p>
            <p className="font-semibold">{client.avgDaysLate} days</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">On-Time Rate</p>
            <p className="font-semibold">{onTimeRate}%</p>
          </div>
        </CardContent>
      </Card>

      {/* Risk Explanation */}
      <Card>
        <CardHeader>
          <CardTitle>Risk Assessment</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Risk score is derived from historical payment behavior including
          average delay, frequency of overdue invoices, and on-time payment rate.
        </CardContent>
      </Card>

      {/* Active Invoices */}
      <Card>
        <CardHeader>
          <CardTitle>Active Invoices</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          This client currently has no active unpaid invoices.
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Last payment received on {new Date(client.lastPayment).toLocaleDateString()}.
        </CardContent>
      </Card>
    </div>
  );
}

/* -----------------------------
   Clients Page
------------------------------ */

export function Clients() {
  const [search, setSearch] = useState("");
  const [riskFilter, setRiskFilter] = useState<RiskLevel | "All">("All");
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  if (selectedClient) {
    return (
      <ClientDetail
        client={selectedClient}
        onBack={() => setSelectedClient(null)}
      />
    );
  }

  const filteredClients = clientsData.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchesRisk = riskFilter === "All" || c.riskLevel === riskFilter;
    return matchesSearch && matchesRisk;
  });

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6 flex justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Clients</p>
              <p className="text-2xl font-bold">{clientsData.length}</p>
            </div>
            <User className="h-8 w-8 opacity-50" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 flex justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Outstanding</p>
              <p className="text-2xl font-bold">
                {formatCurrency(
                  clientsData.reduce((s, c) => s + c.outstandingBalance, 0)
                )}
              </p>
            </div>
            <DollarSign className="h-8 w-8 opacity-50" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 flex justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg Days Late</p>
              <p className="text-2xl font-bold">
                {Math.round(
                  clientsData.reduce((s, c) => s + c.avgDaysLate, 0) /
                    clientsData.length
                )}
              </p>
            </div>
            <Clock className="h-8 w-8 opacity-50" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 flex justify-between">
            <div>
              <p className="text-sm text-muted-foreground">High Risk Clients</p>
              <p className="text-2xl font-bold">
                {clientsData.filter((c) => c.riskLevel === "High").length}
              </p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-600 opacity-50" />
          </CardContent>
        </Card>
      </div>

      {/* Client List */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle>Clients</CardTitle>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-9 w-64"
                placeholder="Search clients..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            {(["All", "High", "Medium", "Low"] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRiskFilter(r as any)}
                className={`px-3 py-2 rounded-md text-sm ${
                  riskFilter === r
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          {filteredClients.map((client) => {
            const onTimeRate = Math.round(
              (client.paidOnTime / client.totalInvoices) * 100
            );

            return (
              <div
                key={client.id}
                role="button"
                onClick={() => setSelectedClient(client)}
                className="flex flex-col lg:flex-row lg:items-center
                           justify-between p-4 border rounded-lg
                           hover:bg-accent/50 cursor-pointer gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{client.name}</h3>
                    {getRiskBadge(client.riskLevel)}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Contact: {client.contact}
                  </p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Outstanding</p>
                    <p className="font-semibold">
                      {formatCurrency(client.outstandingBalance)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Avg Days Late</p>
                    <p className="font-semibold">{client.avgDaysLate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Risk Score</p>
                    <p className="font-semibold">{client.riskScore}/100</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">On-Time Rate</p>
                    <div className="flex items-center gap-1">
                      <p className="font-semibold">{onTimeRate}%</p>
                      {getTrendIcon(client.paymentTrend)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {filteredClients.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No clients found.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
