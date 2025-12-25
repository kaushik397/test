"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, TrendingDown, Flame, Footprints, Droplet } from "lucide-react";

const weightData = [
  { month: "Jan", weight: 82 },
  { month: "Feb", weight: 80 },
  { month: "Mar", weight: 78 },
  { month: "Apr", weight: 77 },
  { month: "May", weight: 75 },
  { month: "Jun", weight: 74 }
];

const calorieData = [
  { day: "Mon", consumed: 2100, burned: 2400 },
  { day: "Tue", consumed: 1900, burned: 2200 },
  { day: "Wed", consumed: 2200, burned: 2500 },
  { day: "Thu", consumed: 2000, burned: 2300 },
  { day: "Fri", consumed: 2300, burned: 2600 },
  { day: "Sat", consumed: 2400, burned: 2700 },
  { day: "Sun", consumed: 2100, burned: 2400 }
];

const macroData = [
  { name: "Protein", value: 30, color: "#10b981" },
  { name: "Carbs", value: 45, color: "#3b82f6" },
  { name: "Fats", value: 25, color: "#f59e0b" }
];

export function DashboardPreview() {
  return (
    <section id="dashboard" className="py-20 bg-gray-50">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl text-gray-900 mb-4">
            Your Personal Health Dashboard
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get a complete overview of your health metrics, progress, and personalized insights
          </p>
        </div>

        <div className="grid gap-6 mb-6 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm">Daily Calories</CardTitle>
              <Flame className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">2,100</div>
              <p className="text-xs text-gray-600 mt-1">
                <span className="text-emerald-600">300</span> below target
              </p>
              <Progress value={70} className="mt-3" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm">Steps Today</CardTitle>
              <Footprints className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">8,542</div>
              <p className="text-xs text-gray-600 mt-1">
                <span className="text-emerald-600">+1,542</span> above goal
              </p>
              <Progress value={85} className="mt-3" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm">Water Intake</CardTitle>
              <Droplet className="h-4 w-4 text-cyan-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">6/8 cups</div>
              <p className="text-xs text-gray-600 mt-1">
                2 cups remaining
              </p>
              <Progress value={75} className="mt-3" />
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="weight" className="space-y-6">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
            <TabsTrigger value="weight">Weight Progress</TabsTrigger>
            <TabsTrigger value="calories">Calories</TabsTrigger>
            <TabsTrigger value="macros">Macros</TabsTrigger>
          </TabsList>

          <TabsContent value="weight" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Weight Tracking</CardTitle>
                <CardDescription>
                  Your weight progress over the last 6 months
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex items-center gap-4">
                  <div>
                    <div className="text-sm text-gray-600">Current Weight</div>
                    <div className="text-2xl">74 kg</div>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-600">
                    <TrendingDown className="h-4 w-4" />
                    <span className="text-sm">-8 kg (10.8%)</span>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={weightData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="weight" stroke="#10b981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calories" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Calorie Balance</CardTitle>
                <CardDescription>
                  Daily calories consumed vs. burned this week
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={calorieData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="consumed" fill="#f59e0b" />
                    <Bar dataKey="burned" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
                <div className="mt-4 flex gap-4 justify-center">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-[#f59e0b]"></div>
                    <span className="text-sm text-gray-600">Consumed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-[#10b981]"></div>
                    <span className="text-sm text-gray-600">Burned</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="macros" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Macro Distribution</CardTitle>
                <CardDescription>
                  Your daily macronutrient breakdown
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={macroData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {macroData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>

                  <div className="space-y-4">
                    {macroData.map((macro, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="h-4 w-4 rounded-full" style={{ backgroundColor: macro.color }}></div>
                        <div>
                          <div className="text-sm">{macro.name}</div>
                          <div className="text-xs text-gray-600">{macro.value}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
