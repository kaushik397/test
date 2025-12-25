import { Button } from "./ui/button";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

const benefits = [
  "AI-powered personalized recommendations",
  "Comprehensive nutrition and fitness tracking",
  "Real-time progress monitoring",
  "Expert workout plans and meal suggestions",
  "Health insights and goal timelines"
];

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-emerald-600 to-emerald-700">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-white mb-6">
            Ready to Transform Your Health?
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            Join thousands of users who have already started their journey to a healthier life
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <a href="#features">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-emerald-800">
                Watch Demo
              </Button>
            </a>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 text-left max-w-3xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2 text-white">
                <Check className="h-5 w-5 flex-shrink-0" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>

          <p className="text-emerald-100 mt-8 text-sm">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
}
