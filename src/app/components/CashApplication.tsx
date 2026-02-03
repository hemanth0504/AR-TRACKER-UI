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
import { Search, CheckCircle, XCircle, AlertCircle, DollarSign } from "lucide-react";
import { useState } from "react";

const unmatchedPayments = [
  {
    id: "PAY-001",
    date: "2024-12-20",
    amount: 9625000,
    reference: "Wire Transfer - ACM124",
    suggestedMatch: "INV-2024-001",
    confidence: 98,
    customer: "Acme Corporation",
  },
  {
    id: "PAY-002",
    date: "2024-12-19",
    amount: 3234000,
    reference: "Check #4521",
    suggestedMatch: "INV-2024-004",
    confidence: 95,
    customer: "NextGen Solutions",
  },
  {
    id: "PAY-003",
    date: "2024-12-18",
    amount: 6545000,
    reference: "ACH - TECH987",
    suggestedMatch: null,
    confidence: 45,
    customer: "Unknown",
  },
  {
    id: "PAY-004",
    date: "2024-12-21",
    amount: 5659500,
    reference: "Wire - DF2024",
    suggestedMatch: "INV-2024-007",
    confidence: 92,
    customer: "DataFlow Systems",
  },
];

const recentApplications = [
  {
    payment: "PAY-045",
    invoice: "INV-2024-025",
    amount: 7546000,
    customer: "Quantum Corp",
    method: "auto",
    status: "applied",
    time: "5 minutes ago",
  },
  {
    payment: "PAY-044",
    invoice: "INV-2024-023",
    amount: 12012000,
    customer: "Innovation Labs",
    method: "auto",
    status: "applied",
    time: "15 minutes ago",
  },
  {
    payment: "PAY-043",
    invoice: "INV-2024-020",
    amount: 6737500,
    customer: "TechStart Industries",
    method: "manual",
    status: "applied",
    time: "1 hour ago",
  },
];

export function CashApplication() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPayments = unmatchedPayments.filter((payment) =>
    payment.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getConfidenceBadge = (confidence: number | null) => {
    if (!confidence) return <Badge variant="outline">No Match</Badge>;
    if (confidence >= 90) return <Badge className="bg-green-500">High Confidence</Badge>;
    if (confidence >= 70) return <Badge className="bg-blue-500">Medium Confidence</Badge>;
    return <Badge className="bg-orange-500">Low Confidence</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Unmatched</p>
                <p className="text-2xl">₹2.5Cr</p>
                <p className="text-xs text-muted-foreground mt-1">4 payments</p>
              </div>
              <DollarSign className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Auto-Matched Today</p>
                <p className="text-2xl">47</p>
                <p className="text-xs text-green-600 mt-1">+12 vs yesterday</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Manual Review</p>
                <p className="text-2xl">3</p>
                <p className="text-xs text-muted-foreground mt-1">Requires attention</p>
              </div>
              <AlertCircle className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Match Rate</p>
                <p className="text-2xl">94%</p>
                <p className="text-xs text-green-600 mt-1">+3% this month</p>
              </div>
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Unmatched Payments */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Unmatched Payments - AI Suggestions</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search payments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Payment ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Reference</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>AI Suggested Match</TableHead>
                  <TableHead>Confidence</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-mono">{payment.id}</TableCell>
                    <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                    <TableCell className="font-medium">
                      ₹{(payment.amount / 100000).toFixed(2)}L
                    </TableCell>
                    <TableCell className="text-sm">{payment.reference}</TableCell>
                    <TableCell>{payment.customer}</TableCell>
                    <TableCell>
                      {payment.suggestedMatch ? (
                        <span className="font-mono text-sm">{payment.suggestedMatch}</span>
                      ) : (
                        <span className="text-sm text-muted-foreground">No match found</span>
                      )}
                    </TableCell>
                    <TableCell>{getConfidenceBadge(payment.confidence)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {payment.suggestedMatch && payment.confidence >= 90 ? (
                          <Button size="sm" className="h-8 gap-1">
                            <CheckCircle className="h-3 w-3" />
                            Auto-Apply
                          </Button>
                        ) : (
                          <>
                            <Button size="sm" variant="outline" className="h-8">
                              Review
                            </Button>
                            <Button size="sm" variant="outline" className="h-8 gap-1">
                              <XCircle className="h-3 w-3" />
                              Reject
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Recent Applications */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Cash Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Payment ID</TableHead>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentApplications.map((app, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-mono">{app.payment}</TableCell>
                    <TableCell className="font-mono">{app.invoice}</TableCell>
                    <TableCell>{app.customer}</TableCell>
                    <TableCell>₹{(app.amount / 100000).toFixed(2)}L</TableCell>
                    <TableCell>
                      <Badge variant={app.method === "auto" ? "default" : "secondary"}>
                        {app.method === "auto" ? "Automated" : "Manual"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-green-500 gap-1">
                        <CheckCircle className="h-3 w-3" />
                        Applied
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{app.time}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}