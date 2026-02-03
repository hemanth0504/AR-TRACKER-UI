import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Mail,
  Upload,
  Database,
  Brain,
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  Calendar,
  User,
  DollarSign,
  Hash,
  Receipt,
  List,
  RefreshCw,
  Eye,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const ingestionSources = [
  {
    id: 1,
    name: "Email (PDF)",
    icon: Mail,
    count: 847,
    lastSync: "2 minutes ago",
    status: "active",
    accuracy: 98.5,
  },
  {
    id: 2,
    name: "Vendor Portal",
    icon: Upload,
    count: 523,
    lastSync: "5 minutes ago",
    status: "active",
    accuracy: 99.2,
  },
  {
    id: 3,
    name: "ERP / Billing System",
    icon: Database,
    count: 1243,
    lastSync: "1 minute ago",
    status: "active",
    accuracy: 99.8,
  },
];

const extractedFields = [
  { field: "Invoice Number", icon: Hash, accuracy: 99.5 },
  { field: "Invoice Date", icon: Calendar, accuracy: 99.2 },
  { field: "Customer Name", icon: User, accuracy: 98.8 },
  { field: "Amount", icon: DollarSign, accuracy: 99.7 },
  { field: "Due Date", icon: Calendar, accuracy: 99.1 },
  { field: "Tax Details", icon: Receipt, accuracy: 98.3 },
  { field: "Line Items", icon: List, accuracy: 97.5 },
];

const processingQueue = [
  {
    id: "ING-001",
    source: "Email",
    filename: "invoice_acme_dec2024.pdf",
    status: "completed",
    confidence: 98,
    extractedData: {
      invoiceNumber: "INV-2024-156",
      invoiceDate: "2024-12-20",
      customer: "Acme Corporation",
      amount: 12450000,
      dueDate: "2025-01-19",
      taxAmount: 2240000,
      lineItems: 8,
    },
    processedAt: "2 min ago",
  },
  {
    id: "ING-002",
    source: "Vendor Portal",
    filename: "TechStart_Invoice_Q4.pdf",
    status: "processing",
    confidence: null,
    extractedData: null,
    processedAt: null,
  },
  {
    id: "ING-003",
    source: "ERP",
    filename: "SAP_Export_20241222.xml",
    status: "completed",
    confidence: 99,
    extractedData: {
      invoiceNumber: "INV-2024-157",
      invoiceDate: "2024-12-21",
      customer: "Global Enterprises",
      amount: 8765000,
      dueDate: "2025-01-20",
      taxAmount: 1577700,
      lineItems: 12,
    },
    processedAt: "5 min ago",
  },
  {
    id: "ING-004",
    source: "Email",
    filename: "inv_nextgen_122224.pdf",
    status: "review",
    confidence: 85,
    extractedData: {
      invoiceNumber: "INV-2024-158",
      invoiceDate: "2024-12-22",
      customer: "NextGen Solutions",
      amount: 5430000,
      dueDate: "2025-01-21",
      taxAmount: 977400,
      lineItems: 5,
    },
    processedAt: "8 min ago",
  },
  {
    id: "ING-005",
    source: "Vendor Portal",
    filename: "quantum_corp_invoice.pdf",
    status: "completed",
    confidence: 97,
    extractedData: {
      invoiceNumber: "INV-2024-159",
      invoiceDate: "2024-12-22",
      customer: "Quantum Corp",
      amount: 9320000,
      dueDate: "2025-01-22",
      taxAmount: 1677600,
      lineItems: 6,
    },
    processedAt: "12 min ago",
  },
];

export function InvoiceIngestion() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-green-500/10 text-green-700 border-green-500/20">
            <CheckCircle className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        );
      case "processing":
        return (
          <Badge className="bg-blue-500/10 text-blue-700 border-blue-500/20">
            <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
            Processing
          </Badge>
        );
      case "review":
        return (
          <Badge className="bg-orange-500/10 text-orange-700 border-orange-500/20">
            <AlertCircle className="h-3 w-3 mr-1" />
            Needs Review
          </Badge>
        );
      default:
        return null;
    }
  };

  const getSourceBadge = (source: string) => {
    const colors: Record<string, string> = {
      Email: "bg-purple-500/10 text-purple-700 border-purple-500/20",
      "Vendor Portal": "bg-blue-500/10 text-blue-700 border-blue-500/20",
      ERP: "bg-green-500/10 text-green-700 border-green-500/20",
    };
    return <Badge className={colors[source] || ""}>{source}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Today's Ingestion</p>
                <p className="text-2xl mt-1">156</p>
                <p className="text-xs text-green-600 mt-1">+18 from yesterday</p>
              </div>
              <FileText className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Accuracy</p>
                <p className="text-2xl mt-1">98.7%</p>
                <p className="text-xs text-green-600 mt-1">+0.3% this week</p>
              </div>
              <Brain className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Processing</p>
                <p className="text-2xl mt-1">3</p>
                <p className="text-xs text-muted-foreground mt-1">In queue</p>
              </div>
              <Clock className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Needs Review</p>
                <p className="text-2xl mt-1">2</p>
                <p className="text-xs text-muted-foreground mt-1">Manual check</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ingestion Sources */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Ingestion Sources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ingestionSources.map((source) => {
              const Icon = source.icon;
              return (
                <div
                  key={source.id}
                  className="rounded-lg border p-4 hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{source.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {source.count} invoices
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-green-500/10 text-green-700 border-green-500/20">
                      Active
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Accuracy</span>
                      <span className="font-medium">{source.accuracy}%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Last Sync</span>
                      <span className="font-medium">{source.lastSync}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* AI Extraction Fields */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI-Powered Data Extraction
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {extractedFields.map((field) => {
              const Icon = field.icon;
              return (
                <div
                  key={field.field}
                  className="rounded-lg border p-3 text-center hover:border-primary/50 transition-colors"
                >
                  <div className="flex justify-center mb-2">
                    <div className="h-8 w-8 rounded-full bg-purple-500/10 flex items-center justify-center">
                      <Icon className="h-4 w-4 text-purple-600" />
                    </div>
                  </div>
                  <p className="text-sm font-medium mb-1">{field.field}</p>
                  <p className="text-xs text-green-600">{field.accuracy}%</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Processing Queue */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Processing Queue
            </CardTitle>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Filename</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Confidence</TableHead>
                <TableHead>Invoice #</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {processingQueue.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-mono text-sm">{item.id}</TableCell>
                  <TableCell>{getSourceBadge(item.source)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm max-w-[200px] truncate">
                        {item.filename}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell>
                    {item.confidence ? (
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              item.confidence >= 95
                                ? "bg-green-500"
                                : item.confidence >= 90
                                ? "bg-blue-500"
                                : "bg-orange-500"
                            }`}
                            style={{ width: `${item.confidence}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">
                          {item.confidence}%
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {item.extractedData?.invoiceNumber || "-"}
                  </TableCell>
                  <TableCell>
                    {item.extractedData?.customer || (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {item.extractedData?.amount ? (
                      <span className="font-medium">
                        ₹{(item.extractedData.amount / 100000).toFixed(2)}L
                      </span>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {item.extractedData?.dueDate
                      ? new Date(item.extractedData.dueDate).toLocaleDateString()
                      : "-"}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      {item.status === "review" && (
                        <Button variant="outline" size="sm">
                          Review
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
