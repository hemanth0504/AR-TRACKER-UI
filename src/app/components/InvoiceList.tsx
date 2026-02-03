import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
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
import { Search, Send } from "lucide-react";

/* -----------------------------
   Types
------------------------------ */

type AgingBucket = "0-30" | "31-60" | "60+";

interface Invoice {
  id: string;
  customer: string;
  amount: number;
  dueDate: string;
  daysOverdue: number;
  riskScore: number;
  lastReminderSent?: string;
}

/* -----------------------------
   Mock Data (Unpaid Invoices)
------------------------------ */

const invoices: Invoice[] = [
  {
    id: "INV-2024-001",
    customer: "Acme Corporation",
    amount: 962500,
    dueDate: "2024-12-15",
    daysOverdue: 7,
    riskScore: 85,
    lastReminderSent: "2024-12-20",
  },
  {
    id: "INV-2024-003",
    customer: "Global Enterprises",
    amount: 1925000,
    dueDate: "2024-11-30",
    daysOverdue: 22,
    riskScore: 92,
    lastReminderSent: "2024-12-15",
  },
  {
    id: "INV-2024-005",
    customer: "Innovation Labs",
    amount: 1201200,
    dueDate: "2024-12-20",
    daysOverdue: 2,
    riskScore: 68,
    lastReminderSent: "2024-12-21",
  },
  {
    id: "INV-2024-008",
    customer: "CloudFirst Inc",
    amount: 1424500,
    dueDate: "2024-11-20",
    daysOverdue: 32,
    riskScore: 95,
    lastReminderSent: "2024-12-10",
  },
];

/* -----------------------------
   Helpers
------------------------------ */

const getAgingBucket = (daysOverdue: number): AgingBucket => {
  if (daysOverdue <= 30) return "0-30";
  if (daysOverdue <= 60) return "31-60";
  return "60+";
};

const getAgingBadge = (bucket: AgingBucket) => {
  switch (bucket) {
    case "0-30":
      return <Badge className="bg-green-500">0–30 Days</Badge>;
    case "31-60":
      return <Badge className="bg-orange-500">31–60 Days</Badge>;
    case "60+":
      return <Badge variant="destructive">60+ Days</Badge>;
  }
};

const getRiskBadge = (score: number) => {
  if (score >= 80) return <Badge variant="destructive">High Risk</Badge>;
  if (score >= 50) return <Badge className="bg-orange-500">Medium Risk</Badge>;
  return <Badge className="bg-green-500">Low Risk</Badge>;
};

/* -----------------------------
   Component
------------------------------ */

export function InvoiceList() {
  const [agingFilter, setAgingFilter] = useState<AgingBucket | "all">("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredInvoices = invoices.filter((invoice) => {
    const bucket = getAgingBucket(invoice.daysOverdue);
    const matchesAging = agingFilter === "all" || bucket === agingFilter;
    const matchesSearch =
      invoice.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesAging && matchesSearch;
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <CardTitle>Unpaid Invoices</CardTitle>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search invoices or clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>

            <Select
              value={agingFilter}
              onValueChange={(value) =>
                setAgingFilter(value as AgingBucket | "all")
              }
            >
              <SelectTrigger className="sm:w-40">
                <SelectValue placeholder="Aging bucket" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Aging</SelectItem>
                <SelectItem value="0-30">0–30 Days</SelectItem>
                <SelectItem value="31-60">31–60 Days</SelectItem>
                <SelectItem value="60+">60+ Days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Outstanding Amount</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Aging</TableHead>
                <TableHead>Risk</TableHead>
                <TableHead>Last Reminder</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredInvoices.map((invoice) => {
                const agingBucket = getAgingBucket(invoice.daysOverdue);

                return (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-mono">
                      {invoice.id}
                    </TableCell>
                    <TableCell>{invoice.customer}</TableCell>
                    <TableCell>
                      ${invoice.amount.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {new Date(invoice.dueDate).toLocaleDateString()}
                      {invoice.daysOverdue > 0 && (
                        <span className="block text-xs text-red-600">
                          {invoice.daysOverdue} days overdue
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      {getAgingBadge(agingBucket)}
                    </TableCell>
                    <TableCell>
                      {getRiskBadge(invoice.riskScore)}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {invoice.lastReminderSent
                        ? new Date(
                            invoice.lastReminderSent
                          ).toLocaleDateString()
                        : "—"}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                        <Button size="sm" className="gap-1">
                          <Send className="h-3 w-3" />
                          Send Reminder
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 text-sm text-muted-foreground">
          Showing {filteredInvoices.length} of {invoices.length} unpaid invoices
        </div>
      </CardContent>
    </Card>
  );
}
