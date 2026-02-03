import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Mail, Phone, MessageSquare, Clock, Play, Pause, Settings2, CheckCircle2 } from "lucide-react";

const workflows = [
  {
    id: "WF-001",
    name: "30-Day Overdue Escalation",
    status: "active",
    triggered: 12,
    success: 9,
    successRate: 75,
    lastRun: "2 hours ago",
  },
  {
    id: "WF-002",
    name: "Pre-Due Date Reminder",
    status: "active",
    triggered: 45,
    success: 38,
    successRate: 84,
    lastRun: "30 minutes ago",
  },
  {
    id: "WF-003",
    name: "High-Risk Customer Alert",
    status: "active",
    triggered: 8,
    success: 7,
    successRate: 87,
    lastRun: "1 hour ago",
  },
  {
    id: "WF-004",
    name: "Payment Plan Follow-up",
    status: "paused",
    triggered: 6,
    success: 5,
    successRate: 83,
    lastRun: "1 day ago",
  },
];

const automationRules = [
  {
    name: "Send reminder 7 days before due",
    channel: "email",
    enabled: true,
    frequency: "Daily at 9:00 AM",
  },
  {
    name: "Escalate 15+ days overdue",
    channel: "email + phone",
    enabled: true,
    frequency: "Every 3 days",
  },
  {
    name: "Auto-apply late fees",
    channel: "system",
    enabled: false,
    frequency: "30 days overdue",
  },
  {
    name: "SMS for high-value invoices",
    channel: "sms",
    enabled: true,
    frequency: "5 days overdue",
  },
  {
    name: "Customer portal notification",
    channel: "portal",
    enabled: true,
    frequency: "Real-time",
  },
];

const recentActions = [
  {
    customer: "Acme Corporation",
    action: "Reminder Email Sent",
    status: "delivered",
    time: "10 minutes ago",
    invoice: "INV-2024-001",
  },
  {
    customer: "Global Enterprises",
    action: "Collections Call Scheduled",
    status: "scheduled",
    time: "45 minutes ago",
    invoice: "INV-2024-003",
  },
  {
    customer: "Innovation Labs",
    action: "Payment Plan Created",
    status: "completed",
    time: "2 hours ago",
    invoice: "INV-2024-005",
  },
  {
    customer: "CloudFirst Inc",
    action: "Escalated to Manager",
    status: "in-progress",
    time: "3 hours ago",
    invoice: "INV-2024-008",
  },
];

export function Collections() {
  const getChannelIcon = (channel: string) => {
    if (channel.includes("email")) return <Mail className="h-4 w-4" />;
    if (channel.includes("phone")) return <Phone className="h-4 w-4" />;
    if (channel.includes("sms")) return <MessageSquare className="h-4 w-4" />;
    return <Settings2 className="h-4 w-4" />;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "paused":
        return <Badge variant="secondary">Paused</Badge>;
      case "delivered":
        return <Badge className="bg-green-500">Delivered</Badge>;
      case "scheduled":
        return <Badge className="bg-blue-500">Scheduled</Badge>;
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>;
      case "in-progress":
        return <Badge className="bg-orange-500">In Progress</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Automated Collections Workflow</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="workflows" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="workflows">Active Workflows</TabsTrigger>
              <TabsTrigger value="rules">Automation Rules</TabsTrigger>
              <TabsTrigger value="activity">Recent Activity</TabsTrigger>
            </TabsList>

            <TabsContent value="workflows" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Workflow ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Triggered</TableHead>
                      <TableHead>Success Rate</TableHead>
                      <TableHead>Last Run</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {workflows.map((workflow) => (
                      <TableRow key={workflow.id}>
                        <TableCell className="font-mono">{workflow.id}</TableCell>
                        <TableCell>{workflow.name}</TableCell>
                        <TableCell>{getStatusBadge(workflow.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span>{workflow.triggered}</span>
                            <span className="text-xs text-muted-foreground">
                              ({workflow.success} successful)
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <Progress value={workflow.successRate} className="h-2 w-20" />
                              <span className="text-sm">{workflow.successRate}%</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {workflow.lastRun}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            {workflow.status === "active" ? (
                              <Button size="sm" variant="outline" className="h-8 gap-1">
                                <Pause className="h-3 w-3" />
                                Pause
                              </Button>
                            ) : (
                              <Button size="sm" variant="outline" className="h-8 gap-1">
                                <Play className="h-3 w-3" />
                                Resume
                              </Button>
                            )}
                            <Button size="sm" variant="outline" className="h-8">
                              Edit
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="rules" className="space-y-4">
              <div className="space-y-3">
                {automationRules.map((rule, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="flex items-center gap-2">
                            {getChannelIcon(rule.channel)}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{rule.name}</p>
                            <div className="flex items-center gap-4 mt-1">
                              <p className="text-sm text-muted-foreground">
                                Channel: <span className="capitalize">{rule.channel}</span>
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Frequency: {rule.frequency}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center space-x-2">
                            <Switch id={`rule-${index}`} checked={rule.enabled} />
                            <Label htmlFor={`rule-${index}`} className="text-sm">
                              {rule.enabled ? "Enabled" : "Disabled"}
                            </Label>
                          </div>
                          <Button size="sm" variant="outline">
                            Configure
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="activity" className="space-y-4">
              <div className="space-y-3">
                {recentActions.map((action, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                            <p className="font-medium">{action.action}</p>
                            {getStatusBadge(action.status)}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Customer: {action.customer} • Invoice: {action.invoice}
                          </p>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {action.time}
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
