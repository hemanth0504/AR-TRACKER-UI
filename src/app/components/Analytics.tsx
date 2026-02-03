import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { TrendingUp, TrendingDown, Calendar, Users, Target } from "lucide-react";

const dsoTrend = [
  { month: "Jul", actual: 48, predicted: 47 },
  { month: "Aug", actual: 46, predicted: 45 },
  { month: "Sep", actual: 44, predicted: 43 },
  { month: "Oct", actual: 43, predicted: 42 },
  { month: "Nov", actual: 42, predicted: 41 },
  { month: "Dec", actual: 42, predicted: 40 },
  { month: "Jan", actual: null, predicted: 39 },
  { month: "Feb", actual: null, predicted: 38 },
  { month: "Mar", actual: null, predicted: 38 },
];

const collectionForecast = [
  { week: "Week 1", forecast: 6.8, actual: 7.0, confidence: 95 },
  { week: "Week 2", forecast: 7.1, actual: 6.9, confidence: 92 },
  { week: "Week 3", forecast: 6.5, actual: 6.7, confidence: 90 },
  { week: "Week 4", forecast: 6.8, actual: null, confidence: 88 },
  { week: "Week 5", forecast: 6.9, actual: null, confidence: 85 },
  { week: "Week 6", forecast: 7.2, actual: null, confidence: 82 },
];

const customerSegmentation = [
  { segment: "Excellent", count: 45, avgDSO: 25, riskScore: 10 },
  { segment: "Good", count: 78, avgDSO: 35, riskScore: 25 },
  { segment: "Fair", count: 34, avgDSO: 48, riskScore: 55 },
  { segment: "At Risk", count: 12, avgDSO: 72, riskScore: 85 },
];

const seasonalPatterns = [
  { month: "Jan", historical: 920, predicted: 940 },
  { month: "Feb", historical: 880, predicted: 890 },
  { month: "Mar", historical: 950, predicted: 970 },
  { month: "Apr", historical: 890, predicted: 900 },
  { month: "May", historical: 980, predicted: 1000 },
  { month: "Jun", historical: 1050, predicted: 1080 },
  { month: "Jul", historical: 940, predicted: 960 },
  { month: "Aug", historical: 910, predicted: 920 },
  { month: "Sep", historical: 980, predicted: 1010 },
  { month: "Oct", historical: 1020, predicted: 1050 },
  { month: "Nov", historical: 960, predicted: 980 },
  { month: "Dec", historical: 890, predicted: 910 },
];

export function Analytics() {
  return (
    <div className="space-y-6">
      {/* Predictive KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <Calendar className="h-8 w-8 text-primary" />
              <Badge variant="outline" className="gap-1">
                <TrendingDown className="h-3 w-3" />
                -4 days
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">Predicted DSO (30 days)</p>
            <p className="text-2xl mt-1">38 days</p>
            <p className="text-xs text-muted-foreground mt-2">
              Current: 42 days • 92% confidence
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <Target className="h-8 w-8 text-primary" />
              <Badge variant="outline" className="gap-1">
                <TrendingUp className="h-3 w-3" />
                +$180K
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">Next 30-Day Collections</p>
            <p className="text-2xl mt-1">₹27.7Cr</p>
            <p className="text-xs text-muted-foreground mt-2">
              Range: ₹26.2Cr - ₹29.2Cr • 88% confidence
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <Users className="h-8 w-8 text-primary" />
              <Badge variant="destructive">12 At Risk</Badge>
            </div>
            <p className="text-sm text-muted-foreground">High-Risk Customers</p>
            <p className="text-2xl mt-1">7.1%</p>
            <p className="text-xs text-muted-foreground mt-2">
              169 total customers • Risk threshold: 80+
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="dso" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dso">DSO Prediction</TabsTrigger>
          <TabsTrigger value="collections">Collection Forecast</TabsTrigger>
          <TabsTrigger value="segmentation">Customer Segmentation</TabsTrigger>
          <TabsTrigger value="seasonal">Seasonal Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="dso" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Days Sales Outstanding (DSO) Prediction</CardTitle>
              <p className="text-sm text-muted-foreground">
                ML-powered forecast showing expected DSO trend based on historical patterns and current AR health
              </p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={dsoTrend}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-sm" />
                  <YAxis className="text-sm" label={{ value: "Days", angle: -90, position: "insideLeft" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="actual"
                    stroke="#10b981"
                    strokeWidth={2}
                    name="Actual DSO"
                    dot={{ fill: "#10b981", r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="predicted"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Predicted DSO"
                    dot={{ fill: "#3b82f6", r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="collections" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>6-Week Collection Forecast</CardTitle>
              <p className="text-sm text-muted-foreground">
                AI-predicted collection amounts with confidence intervals based on customer payment behavior
              </p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={collectionForecast}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="week" className="text-sm" />
                  <YAxis className="text-sm" label={{ value: "₹Cr", angle: -90, position: "insideLeft" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => `₹${value}Cr`}
                  />
                  <Legend />
                  <Bar dataKey="actual" fill="#10b981" name="Actual (₹Cr)" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="forecast" fill="#3b82f6" name="Forecast (₹Cr)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 grid grid-cols-3 gap-4">
                {collectionForecast.slice(3).map((week) => (
                  <div key={week.week} className="rounded-lg border p-3">
                    <p className="text-sm font-medium">{week.week}</p>
                    <p className="text-xl mt-1">₹{week.forecast}Cr</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {week.confidence}% confidence
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="segmentation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Customer Segmentation</CardTitle>
              <p className="text-sm text-muted-foreground">
                Customers grouped by payment behavior, risk profile, and DSO performance
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {customerSegmentation.map((segment, index) => (
                  <div
                    key={index}
                    className="rounded-lg border p-4 hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`h-12 w-12 rounded-full flex items-center justify-center text-xl ${
                            segment.segment === "Excellent"
                              ? "bg-green-100 text-green-700"
                              : segment.segment === "Good"
                              ? "bg-blue-100 text-blue-700"
                              : segment.segment === "Fair"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {segment.count}
                        </div>
                        <div>
                          <p className="font-medium">{segment.segment} Payers</p>
                          <p className="text-sm text-muted-foreground">
                            {segment.count} customers in this segment
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant={segment.riskScore > 70 ? "destructive" : "outline"}
                        className="text-sm"
                      >
                        Risk: {segment.riskScore}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-3 pt-3 border-t">
                      <div>
                        <p className="text-xs text-muted-foreground">Avg DSO</p>
                        <p className="text-lg font-medium">{segment.avgDSO} days</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Risk Score</p>
                        <p className="text-lg font-medium">{segment.riskScore}/100</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">% of Total</p>
                        <p className="text-lg font-medium">
                          {((segment.count / 169) * 100).toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seasonal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Seasonal Collection Patterns</CardTitle>
              <p className="text-sm text-muted-foreground">
                Historical vs predicted collection trends identifying seasonal patterns and anomalies
              </p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={seasonalPatterns}>
                  <defs>
                    <linearGradient id="colorHistorical" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                    </linearGradient>
                    <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-sm" />
                  <YAxis className="text-sm" label={{ value: "$K", angle: -90, position: "insideLeft" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => `$${value}K`}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="historical"
                    stroke="#3b82f6"
                    fillOpacity={1}
                    fill="url(#colorHistorical)"
                    name="Historical ($K)"
                  />
                  <Area
                    type="monotone"
                    dataKey="predicted"
                    stroke="#10b981"
                    fillOpacity={1}
                    fill="url(#colorPredicted)"
                    name="Predicted ($K)"
                  />
                </AreaChart>
              </ResponsiveContainer>
              <div className="mt-4 p-4 rounded-lg bg-primary/5 border border-primary/20">
                <p className="text-sm">
                  <span className="font-medium">Key Insights:</span> Collections typically peak in
                  June and October. Q1 shows consistent underperformance. AI predicts 8% improvement
                  in Q2 2025 with current automation strategies.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}