import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";
import { Progress } from "./ui/progress";
import { Brain, TrendingUp, AlertTriangle, Target, Lightbulb, Zap } from "lucide-react";

const aiInsights = [
  {
    type: "risk",
    title: "High-Risk Customer Alert",
    description: "CloudFirst Inc has a payment delay pattern. 32 days overdue with 95% risk score.",
    impact: "Critical",
    recommendation: "Escalate to collections team immediately. Consider credit hold.",
    confidence: 94,
  },
  {
    type: "opportunity",
    title: "Early Payment Opportunity",
    description: "Quantum Corp has historically paid 15 days early. Offer 2% discount for early payment.",
    impact: "High",
    recommendation: "Send early payment incentive offer. Potential to improve DSO by 3 days.",
    confidence: 87,
  },
  {
    type: "prediction",
    title: "Cash Flow Prediction",
    description: "Based on historical patterns, expect ₹6.8Cr collection in next 7 days.",
    impact: "Medium",
    recommendation: "Confidence interval: ₹6.3Cr - ₹7.3Cr. Plan accordingly for working capital.",
    confidence: 92,
  },
  {
    type: "automation",
    title: "Automation Success",
    description: "AI-powered reminders increased collection rate by 18% this month.",
    impact: "High",
    recommendation: "Continue automated reminder cadence. Expand to more customer segments.",
    confidence: 96,
  },
];

const predictiveMetrics = [
  {
    metric: "Predicted Collection Rate (Next 30 Days)",
    current: 89,
    target: 92,
    trend: "+3.2%",
    icon: Target,
  },
  {
    metric: "Days Sales Outstanding (DSO) Forecast",
    current: 42,
    target: 38,
    trend: "-2 days",
    icon: TrendingUp,
  },
  {
    metric: "At-Risk Accounts Detection",
    current: 8,
    target: 5,
    trend: "-3 accounts",
    icon: AlertTriangle,
  },
];

export function AIInsights() {
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "Critical":
        return "destructive";
      case "High":
        return "default";
      case "Medium":
        return "secondary";
      default:
        return "outline";
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "risk":
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case "opportunity":
        return <Lightbulb className="h-5 w-5 text-yellow-600" />;
      case "prediction":
        return <Brain className="h-5 w-5 text-blue-600" />;
      case "automation":
        return <Zap className="h-5 w-5 text-green-600" />;
      default:
        return <Brain className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* AI Insights Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            <CardTitle>AI-Powered Insights & Predictions</CardTitle>
          </div>
        </CardHeader>
      </Card>

      {/* Predictive Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {predictiveMetrics.map((item, index) => {
          const Icon = item.icon;
          return (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Icon className="h-8 w-8 text-primary" />
                    <Badge variant="outline">{item.trend}</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{item.metric}</p>
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="text-2xl">{item.current}</span>
                      <span className="text-sm text-muted-foreground">/ {item.target} target</span>
                    </div>
                  </div>
                  <Progress value={(item.current / item.target) * 100} className="h-2" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* AI Insights Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {aiInsights.map((insight, index) => (
          <Card key={index} className="border-l-4 border-l-primary">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  {getInsightIcon(insight.type)}
                  <CardTitle className="text-base">{insight.title}</CardTitle>
                </div>
                <Badge variant={getImpactColor(insight.impact) as any}>{insight.impact}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">{insight.description}</p>
              <Alert>
                <Lightbulb className="h-4 w-4" />
                <AlertDescription>
                  <span className="font-medium">Recommendation: </span>
                  {insight.recommendation}
                </AlertDescription>
              </Alert>
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-muted-foreground">AI Confidence</span>
                <div className="flex items-center gap-2">
                  <Progress value={insight.confidence} className="h-1.5 w-24" />
                  <span className="text-xs font-medium">{insight.confidence}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Real-time Analytics */}
      <Card>
        <CardHeader>
          <CardTitle>Real-Time Analytics & Monitoring</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Active Automations</p>
                <p className="text-2xl">247</p>
                <Progress value={85} className="h-1.5" />
                <p className="text-xs text-muted-foreground">85% success rate</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Emails Sent (Today)</p>
                <p className="text-2xl">132</p>
                <Progress value={72} className="h-1.5" />
                <p className="text-xs text-muted-foreground">72% open rate</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">AI Predictions Made</p>
                <p className="text-2xl">1,847</p>
                <Progress value={94} className="h-1.5" />
                <p className="text-xs text-muted-foreground">94% accuracy</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Risk Alerts Triggered</p>
                <p className="text-2xl">18</p>
                <Progress value={67} className="h-1.5" />
                <p className="text-xs text-muted-foreground">12 resolved</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}