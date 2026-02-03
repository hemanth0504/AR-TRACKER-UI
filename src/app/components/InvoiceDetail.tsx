import { Send } from "lucide-react";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

interface Invoice {
  id: string;
  customer: string;
  amount: number;
  dueDate: string;
  daysOverdue: number;
  riskScore: number;
  lastReminderSent?: string;
}

function InvoiceDetail({
  invoice,
  onBack,
}: {
  invoice: Invoice;
  onBack: () => void;
}) {
  const agingBucket =
    invoice.daysOverdue <= 30
      ? "0–30 Days"
      : invoice.daysOverdue <= 60
      ? "31–60 Days"
      : "60+ Days";

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="text-sm text-muted-foreground hover:underline"
      >
        ← Back to Invoices
      </button>

      <Card>
        <CardHeader>
          <CardTitle>Invoice {invoice.id}</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Client</p>
            <p className="font-semibold">{invoice.customer}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Amount</p>
            <p className="font-semibold">
              ${invoice.amount.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Due Date</p>
            <p className="font-semibold">
              {new Date(invoice.dueDate).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Aging</p>
            <Badge>{agingBucket}</Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          No payments have been recorded for this invoice.
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Reminder History</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          {invoice.lastReminderSent
            ? `Last reminder sent on ${new Date(
                invoice.lastReminderSent
              ).toLocaleDateString()}.`
            : "No reminders have been sent for this invoice."}
        </CardContent>
      </Card>

      <div className="flex gap-2">
        <Button>
          <Send className="h-4 w-4 mr-1" />
          Send Reminder
        </Button>
        <Button variant="outline">Add Internal Note</Button>
      </div>
    </div>
  );
}
