import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Search, Download, Send, AlertCircle, CheckCircle2, Clock } from "lucide-react";
import { useState } from "react";

const invoices = [
  {
    id: "INV-2024-001",
    customer: "Acme Corporation",
    amount: 9625000,
    dueDate: "2024-12-15",
    status: "overdue",
    daysOverdue: 7,
    riskScore: 85,
    lastContact: "2024-12-20",
  },
  {
    id: "INV-2024-002",
    customer: "TechStart Industries",
    amount: 6737500,
    dueDate: "2024-12-28",
    status: "due-soon",
    daysOverdue: 0,
    riskScore: 45,
    lastContact: "2024-12-18",
  },
  {
    id: "INV-2024-003",
    customer: "Global Enterprises",
    amount: 19250000,
    dueDate: "2024-11-30",
    status: "overdue",
    daysOverdue: 22,
    riskScore: 92,
    lastContact: "2024-12-15",
  },
  {
    id: "INV-2024-004",
    customer: "NextGen Solutions",
    amount: 3234000,
    dueDate: "2025-01-05",
    status: "current",
    daysOverdue: 0,
    riskScore: 20,
    lastContact: "2024-12-22",
  },
  {
    id: "INV-2024-005",
    customer: "Innovation Labs",
    amount: 12012000,
    dueDate: "2024-12-20",
    status: "overdue",
    daysOverdue: 2,
    riskScore: 68,
    lastContact: "2024-12-21",
  },
  {
    id: "INV-2024-006",
    customer: "Quantum Corp",
    amount: 7546000,
    dueDate: "2025-01-10",
    status: "current",
    daysOverdue: 0,
    riskScore: 15,
    lastContact: "2024-12-19",
  },
  {
    id: "INV-2024-007",
    customer: "DataFlow Systems",
    amount: 5659500,
    dueDate: "2024-12-25",
    status: "due-soon",
    daysOverdue: 0,
    riskScore: 38,
    lastContact: "2024-12-16",
  },
  {
    id: "INV-2024-008",
    customer: "CloudFirst Inc",
    amount: 14245000,
    dueDate: "2024-11-20",
    status: "overdue",
    daysOverdue: 32,
    riskScore: 95,
    lastContact: "2024-12-10",
  },
];

export function InvoiceList() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesStatus = statusFilter === "all" || invoice.status === statusFilter;
    const matchesSearch =
      invoice.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "overdue":
        return (
          <Badge variant="destructive" className="gap-1">
            <AlertCircle className="h-3 w-3" />
            Overdue
          </Badge>
        );
      case "due-soon":
        return (
          <Badge variant="outline" className="gap-1 border-orange-500 text-orange-600">
            <Clock className="h-3 w-3" />
            Due Soon
          </Badge>
        );
      case "current":
        return (
          <Badge variant="outline" className="gap-1 border-green-500 text-green-600">
            <CheckCircle2 className="h-3 w-3" />
            Current
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getRiskBadge = (score: number) => {
    if (score >= 80) {
      return <Badge variant="destructive">High Risk</Badge>;
    } else if (score >= 50) {
      return <Badge className="bg-orange-500">Medium Risk</Badge>;
    } else {
      return <Badge className="bg-green-500">Low Risk</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <CardTitle>Invoice Management</CardTitle>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search invoices or customers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Filter status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                  <SelectItem value="due-soon">Due Soon</SelectItem>
                  <SelectItem value="current">Current</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Risk Score</TableHead>
                  <TableHead>Last Contact</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-mono">{invoice.id}</TableCell>
                    <TableCell>{invoice.customer}</TableCell>
                    <TableCell>₹{(invoice.amount / 100000).toFixed(2)}L</TableCell>
                    <TableCell>
                      {new Date(invoice.dueDate).toLocaleDateString()}
                      {invoice.daysOverdue > 0 && (
                        <span className="block text-xs text-red-600">
                          {invoice.daysOverdue} days overdue
                        </span>
                      )}
                    </TableCell>
                    <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                    <TableCell>{getRiskBadge(invoice.riskScore)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(invoice.lastContact).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="h-8">
                          View
                        </Button>
                        <Button size="sm" className="h-8 gap-1">
                          <Send className="h-3 w-3" />
                          Send Reminder
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
            <div>
              Showing {filteredInvoices.length} of {invoices.length} invoices
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}