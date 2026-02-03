import { useState } from "react";
import {
  Bell,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Calendar,
  Send,
  Mail,
  MessageSquare,
  Phone,
  TrendingUp,
  Filter,
  Search,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

type ReminderStatus = "scheduled" | "sent" | "failed" | "pending";
type ReminderChannel = "email" | "sms" | "whatsapp" | "call";

type Reminder = {
  id: string;
  invoiceNumber: string;
  clientName: string;
  amount: number;
  dueDate: string;
  scheduledDate: string;
  status: ReminderStatus;
  channel: ReminderChannel;
  attemptCount: number;
  lastAttempt?: string;
  nextAttempt?: string;
  responseReceived?: boolean;
};

export function Reminders() {
  const [activeView, setActiveView] = useState<"action" | "upcoming" | "history">("action");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data
  const actionRequiredReminders: Reminder[] = [
    {
      id: "1",
      invoiceNumber: "INV-2024-1234",
      clientName: "Acme Corp",
      amount: 250000,
      dueDate: "2024-01-15",
      scheduledDate: "2024-01-22",
      status: "failed",
      channel: "email",
      attemptCount: 2,
      lastAttempt: "2024-02-01",
    },
    {
      id: "2",
      invoiceNumber: "INV-2024-1156",
      clientName: "Tech Solutions Ltd",
      amount: 180000,
      dueDate: "2024-01-10",
      scheduledDate: "2024-02-03",
      status: "pending",
      channel: "email",
      attemptCount: 0,
    },
  ];

  const upcomingReminders: Reminder[] = [
    {
      id: "3",
      invoiceNumber: "INV-2024-1289",
      clientName: "Global Enterprises",
      amount: 450000,
      dueDate: "2024-02-10",
      scheduledDate: "2024-02-04",
      status: "scheduled",
      channel: "email",
      attemptCount: 1,
      nextAttempt: "2024-02-04",
    },
    {
      id: "4",
      invoiceNumber: "INV-2024-1301",
      clientName: "Retail Hub Inc",
      amount: 320000,
      dueDate: "2024-02-12",
      scheduledDate: "2024-02-05",
      status: "scheduled",
      channel: "sms",
      attemptCount: 0,
      nextAttempt: "2024-02-05",
    },
  ];

  const reminderHistory: Reminder[] = [
    {
      id: "5",
      invoiceNumber: "INV-2024-1098",
      clientName: "Manufacturing Co",
      amount: 560000,
      dueDate: "2024-01-20",
      scheduledDate: "2024-01-27",
      status: "sent",
      channel: "email",
      attemptCount: 1,
      lastAttempt: "2024-01-27",
      responseReceived: true,
    },
    {
      id: "6",
      invoiceNumber: "INV-2024-1045",
      clientName: "Services Group",
      amount: 275000,
      dueDate: "2024-01-18",
      scheduledDate: "2024-01-25",
      status: "sent",
      channel: "email",
      attemptCount: 2,
      lastAttempt: "2024-01-30",
      responseReceived: false,
    },
  ];

  const getStatusColor = (status: ReminderStatus) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "sent":
        return "bg-green-100 text-green-800";
      case "failed":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getChannelIcon = (channel: ReminderChannel) => {
    switch (channel) {
      case "email":
        return <Mail className="h-4 w-4" />;
      case "sms":
        return <MessageSquare className="h-4 w-4" />;
      case "whatsapp":
        return <MessageSquare className="h-4 w-4" />;
      case "call":
        return <Phone className="h-4 w-4" />;
    }
  };

  const ReminderCard = ({ reminder }: { reminder: Reminder }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold">{reminder.clientName}</h4>
              <Badge className={getStatusColor(reminder.status)}>
                {reminder.status}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {reminder.invoiceNumber}
            </p>
          </div>
          <div className="text-right">
            <p className="font-semibold">${(reminder.amount / 1000).toFixed(2)}K</p>
            <p className="text-xs text-muted-foreground">
              Due: {new Date(reminder.dueDate).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-muted-foreground">
              {getChannelIcon(reminder.channel)}
              <span className="capitalize">{reminder.channel}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Attempt {reminder.attemptCount}</span>
            </div>
          </div>
          <div className="flex gap-2">
            {reminder.status === "failed" && (
              <Button size="sm" variant="outline">
                <Send className="h-3 w-3 mr-1" />
                Retry
              </Button>
            )}
            {reminder.status === "pending" && (
              <Button size="sm">
                <Send className="h-3 w-3 mr-1" />
                Send Now
              </Button>
            )}
            {reminder.status === "scheduled" && (
              <Button size="sm" variant="outline">
                Edit
              </Button>
            )}
            {reminder.status === "sent" && reminder.responseReceived && (
              <Badge variant="outline" className="text-green-600">
                <CheckCircle className="h-3 w-3 mr-1" />
                Response
              </Badge>
            )}
          </div>
        </div>

        {(reminder.lastAttempt || reminder.nextAttempt) && (
          <div className="mt-3 pt-3 border-t text-xs text-muted-foreground">
            {reminder.lastAttempt && (
              <span>Last sent: {new Date(reminder.lastAttempt).toLocaleString()}</span>
            )}
            {reminder.nextAttempt && (
              <span>Next: {new Date(reminder.nextAttempt).toLocaleString()}</span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Action Required</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              Failed or pending reminders
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled Today</CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">
              Reminders going out today
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sent This Week</CardTitle>
            <Send className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">
              Across all channels
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <p className="text-xs text-muted-foreground">
              +12% from last week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by invoice, client..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {/* View Tabs */}
      <div className="flex gap-2 border-b">
        <Button
          variant={activeView === "action" ? "default" : "ghost"}
          onClick={() => setActiveView("action")}
          className="rounded-b-none"
        >
          <AlertCircle className="h-4 w-4 mr-2" />
          Action Required ({actionRequiredReminders.length})
        </Button>
        <Button
          variant={activeView === "upcoming" ? "default" : "ghost"}
          onClick={() => setActiveView("upcoming")}
          className="rounded-b-none"
        >
          <Calendar className="h-4 w-4 mr-2" />
          Upcoming ({upcomingReminders.length})
        </Button>
        <Button
          variant={activeView === "history" ? "default" : "ghost"}
          onClick={() => setActiveView("history")}
          className="rounded-b-none"
        >
          <Clock className="h-4 w-4 mr-2" />
          History
        </Button>
      </div>

      {/* Content Based on Active View */}
      <div className="space-y-3">
        {activeView === "action" && (
          <>
            {actionRequiredReminders.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <CheckCircle className="h-12 w-12 text-green-600 mb-3" />
                  <h3 className="font-semibold text-lg mb-1">All Clear!</h3>
                  <p className="text-sm text-muted-foreground">
                    No reminders require immediate attention
                  </p>
                </CardContent>
              </Card>
            ) : (
              <>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">Reminders Needing Attention</h3>
                  <Button size="sm">
                    <Send className="h-3 w-3 mr-1" />
                    Send All Pending
                  </Button>
                </div>
                {actionRequiredReminders.map((reminder) => (
                  <ReminderCard key={reminder.id} reminder={reminder} />
                ))}
              </>
            )}
          </>
        )}

        {activeView === "upcoming" && (
          <>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">Scheduled Reminders</h3>
              <Button size="sm" variant="outline">
                <Calendar className="h-3 w-3 mr-1" />
                View Calendar
              </Button>
            </div>
            {upcomingReminders.map((reminder) => (
              <ReminderCard key={reminder.id} reminder={reminder} />
            ))}
          </>
        )}

        {activeView === "history" && (
          <>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">Reminder History</h3>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  Export
                </Button>
              </div>
            </div>
            {reminderHistory.map((reminder) => (
              <ReminderCard key={reminder.id} reminder={reminder} />
            ))}
          </>
        )}
      </div>

      {/* Automation Summary Card */}
      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Active Automation Rules
          </CardTitle>
          <CardDescription>
            Your current reminder cadence and escalation settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">First reminder</span>
            <span className="font-medium">7 days after due date</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Follow-up cadence</span>
            <span className="font-medium">Every 7 days (3 attempts)</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Escalation</span>
            <span className="font-medium">After 21 days overdue</span>
          </div>
          <Button size="sm" variant="outline" className="w-full mt-3">
            Manage Automation Rules
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}