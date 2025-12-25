import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Activity, Apple, Dumbbell, BarChart3, Brain, Target } from "lucide-react";

const features = [
  {
    icon: Apple,
    title: "Calorie & Nutrition Tracker",
    description: "Track your daily meals, calories, and macros with our intelligent food database and barcode scanner.",
    color: "text-red-600",
    bgColor: "bg-red-100"
  },
  {
    icon: Dumbbell,
    title: "Exercise Planner",
    description: "Get personalized workout plans tailored to your fitness level, goals, and available equipment.",
    color: "text-blue-600",
    bgColor: "bg-blue-100"
  },
  {
    icon: BarChart3,
    title: "Health Dashboard",
    description: "Monitor your progress with comprehensive reports on weight, body metrics, and fitness achievements.",
    color: "text-purple-600",
    bgColor: "bg-purple-100"
  },
  {
    icon: Brain,
    title: "AI-Driven Insights",
    description: "Receive smart recommendations for meals and workouts based on your habits and health data.",
    color: "text-emerald-600",
    bgColor: "bg-emerald-100"
  },
  {
    icon: Target,
    title: "Goal Tracking",
    description: "Set custom health goals and get estimated timelines to achieve them based on your progress.",
    color: "text-orange-600",
    bgColor: "bg-orange-100"
  },
  {
    icon: Activity,
    title: "Progress Monitoring",
    description: "View detailed analytics of your physical progress, trends, and health improvements over time.",
    color: "text-pink-600",
    bgColor: "bg-pink-100"
  }
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl text-gray-900 mb-4">
            Everything You Need for a Healthier Life
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive tools and AI-powered features to help you achieve your health and fitness goals
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className={`h-12 w-12 rounded-lg ${feature.bgColor} flex items-center justify-center mb-4`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
