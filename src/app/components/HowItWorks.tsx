import { Card, CardContent } from "./ui/card";
import { UserPlus, Sparkles, TrendingUp, Target } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Create Your Profile",
    description: "Share your age, gender, height, weight, medical history, and lifestyle habits to get started.",
    step: "1"
  },
  {
    icon: Target,
    title: "Set Your Goals",
    description: "Define your health objectives - weight loss, muscle gain, improved fitness, or overall wellness.",
    step: "2"
  },
  {
    icon: Sparkles,
    title: "Get AI Insights",
    description: "Receive personalized meal plans, workout routines, and health recommendations powered by AI.",
    step: "3"
  },
  {
    icon: TrendingUp,
    title: "Track & Achieve",
    description: "Monitor your progress with detailed analytics and estimated timelines to reach your targets.",
    step: "4"
  }
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl text-gray-900 mb-4">
            How Healithm Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get started in minutes and begin your transformation journey with AI-powered guidance
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 relative">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-emerald-300 to-transparent" />
              )}
              <Card className="relative border-2 hover:shadow-lg transition-shadow h-full">
                <CardContent className="pt-6">
                  <div className="relative mb-4">
                    <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mb-4">
                      <step.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center">
                      <span className="text-emerald-700">{step.step}</span>
                    </div>
                  </div>
                  <h3 className="text-xl text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
