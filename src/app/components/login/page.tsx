"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Activity, Mail, Lock, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { loginUser, clearError } from "@/lib/redux/slices/authSlice";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isLoading, error } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Clear error when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const result = await dispatch(loginUser({ email, password }));

    if (loginUser.fulfilled.match(result)) {
      // Login successful - redirect to dashboard
      router.push("/dashboard");
    }
    // Error is automatically handled by Redux state
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-emerald-50 px-4 py-12">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo/Brand */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <Activity className="h-8 w-8 text-emerald-600" />
          <span className="text-2xl font-bold text-emerald-600">Healithm</span>
        </Link>

        <Card className="border-emerald-100 shadow-xl">
          <CardHeader className="space-y-1 text-center pb-4">
            <div className="inline-flex items-center justify-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full w-fit mx-auto mb-2">
              <Sparkles className="h-4 w-4" />
              <span className="text-xs font-medium">Welcome Back</span>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Sign in to your account
            </CardTitle>
            <CardDescription className="text-gray-600">
              Continue your health journey with Healithm
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
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Lock className="h-4 w-4 text-emerald-600" />
                    Password
                  </label>
                  <Link
                    href="#"
                    className="text-xs text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <input
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 shadow-sm transition-all focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 placeholder:text-gray-400"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Enter your password"
                  required
                  disabled={isLoading}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-6 text-base font-medium shadow-lg hover:shadow-xl transition-all"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Signing in...
                  </span>
                ) : (
                  <>
                    Sign in
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </form>

            {error && (
              <div className="mt-4 rounded-lg px-4 py-3 text-sm bg-red-50 text-red-800 border border-red-200">
                <p className="font-medium">Login failed</p>
                <p className="text-xs mt-1">{error}</p>
              </div>
            )}

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                  className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
                  href="/signup"
                >
                  Create one now
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-xs text-gray-500">
          By signing in, you agree to our{" "}
          <Link href="#" className="text-emerald-600 hover:underline">Terms of Service</Link>
          {" "}and{" "}
          <Link href="#" className="text-emerald-600 hover:underline">Privacy Policy</Link>
        </p>
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
      `}</style>
    </div>
  );
}
