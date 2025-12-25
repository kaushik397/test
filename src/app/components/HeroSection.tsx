import { Button } from "./ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50 to-white py-20 md:py-32">
      <div className="container px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full w-fit">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm">AI-Powered Health Platform</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-gray-900">
              Your Personal Health Journey Starts Here
            </h1>
            
            <p className="text-lg text-gray-600">
              Healithm uses advanced AI to monitor, manage, and improve your overall well-being. 
              Get personalized insights, nutrition tracking, workout plans, and achieve your health goals faster.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div>
                <div className="text-2xl text-gray-900">50K+</div>
                <div className="text-sm text-gray-600">Active Users</div>
              </div>
              <div>
                <div className="text-2xl text-gray-900">4.9/5</div>
                <div className="text-sm text-gray-600">User Rating</div>
              </div>
              <div>
                <div className="text-2xl text-gray-900">1M+</div>
                <div className="text-sm text-gray-600">Meals Tracked</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1759476532819-e37ac3d05cff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwaGVhbHRoJTIwd2VsbG5lc3N8ZW58MXx8fHwxNzYyNDQ5MjYxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Health and Fitness"
                className="w-full h-[500px] object-cover"
              />
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-900">Daily Goal Achieved!</div>
                  <div className="text-xs text-gray-600">8,542 steps today</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
