"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Activity, Mail, Lock, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { signupUser, clearError } from "@/lib/redux/slices/authSlice";

export default function SignupPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isLoading, error } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Clear error when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSuccessMessage(null);

    const result = await dispatch(signupUser({ email, password }));

    if (signupUser.fulfilled.match(result)) {
      setSuccessMessage(
        "Signup successful! Redirecting to dashboard..."
      );
      // Redirect after a short delay to show success message
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    }
    // Error is automatically handled by Redux state
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-emerald-50 px-4 py-12">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 -left-40 w-80 h-80 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-1/2 w-80 h-80 bg-emerald-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="w-full max-w-5xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left side - Benefits */}
          <div className="hidden lg:block">
            <Link href="/" className="flex items-center gap-2 mb-8">
              <Activity className="h-8 w-8 text-emerald-600" />
              <span className="text-2xl font-bold text-emerald-600">Healithm</span>
            </Link>

            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Start Your Health Journey Today
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Join thousands of users who are achieving their health goals with AI-powered insights and personalized recommendations.
            </p>

            <div className="space-y-4">
              {[
                "Track calories, nutrition, and exercise effortlessly",
                "Get AI-powered meal and workout recommendations",
                "Monitor your progress with detailed analytics",
                "Achieve your health goals faster with personalized plans"
              ].map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  </div>
                  <p className="text-gray-700">{benefit}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-8">
              <div>
                <div className="text-3xl font-bold text-gray-900">50K+</div>
                <div className="text-sm text-gray-600">Active Users</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">4.9/5</div>
                <div className="text-sm text-gray-600">User Rating</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">1M+</div>
                <div className="text-sm text-gray-600">Meals Tracked</div>
              </div>
            </div>
          </div>

          {/* Right side - Signup Form */}
          <div>
            {/* Mobile logo */}
            <Link href="/" className="flex lg:hidden items-center justify-center gap-2 mb-8">
              <Activity className="h-8 w-8 text-emerald-600" />
              <span className="text-2xl font-bold text-emerald-600">Healithm</span>
            </Link>

            <Card className="border-emerald-100 shadow-xl">
              <CardHeader className="space-y-1 text-center pb-4">
                <div className="inline-flex items-center justify-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full w-fit mx-auto mb-2">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-xs font-medium">Get Started Free</span>
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Create your account
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Start tracking your health goals today
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Mail className="h-4 w-4 text-emerald-600" />
                      Email
                    </label>
                    <input
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 shadow-sm transition-all focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 placeholder:text-gray-400"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      placeholder="you@example.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Lock className="h-4 w-4 text-emerald-600" />
                      Password
                    </label>
                    <input
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 shadow-sm transition-all focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 placeholder:text-gray-400"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      placeholder="Choose a strong password"
                      required
                    />
                    <p className="text-xs text-gray-500">
                      Must be at least 8 characters long
                    </p>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-6 text-base font-medium shadow-lg hover:shadow-xl transition-all"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Creating account...
                      </span>
                    ) : (
                      <>
                        Create account
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </form>

                {error && error.toLowerCase().includes("confirmation") && (
                  <div className="mt-4 rounded-lg bg-yellow-50 border border-yellow-200 px-4 py-3 text-sm text-yellow-800">
                    <p className="font-medium mb-2">{error}</p>
                    <div className="text-xs space-y-1">
                      <p className="font-medium">Quick fixes:</p>
                      <ul className="ml-4 list-disc space-y-1">
                        <li>Configure an SMTP provider in your Supabase project (Project → Settings → Email).</li>
                        <li>Or disable email confirmations in Supabase Auth settings for testing.</li>
                      </ul>
                      <p className="mt-2">
                        Supabase docs:{" "}
                        <a className="text-yellow-900 underline" href="https://supabase.com/docs/guides/auth#email">
                          https://supabase.com/docs/guides/auth#email
                        </a>
                      </p>
                    </div>
                  </div>
                )}

                {error && !error.toLowerCase().includes("confirmation") && (
                  <div className="mt-4 rounded-lg px-4 py-3 text-sm bg-red-50 text-red-800 border border-red-200">
                    <p className="font-medium">Signup failed</p>
                    <p className="text-xs mt-1">{error}</p>
                  </div>
                )}

                {successMessage && (
                  <div className="mt-4 rounded-lg px-4 py-3 text-sm bg-emerald-50 text-emerald-800 border border-emerald-200">
                    <p className="font-medium">Success!</p>
                    <p className="text-xs mt-1">{successMessage}</p>
                  </div>
                )}

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link
                      className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
                      href="/components/login"
                    >
                      Sign in
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>

            <p className="mt-6 text-center text-xs text-gray-500">
              By creating an account, you agree to our{" "}
              <Link href="#" className="text-emerald-600 hover:underline">Terms of Service</Link>
              {" "}and{" "}
              <Link href="#" className="text-emerald-600 hover:underline">Privacy Policy</Link>
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
