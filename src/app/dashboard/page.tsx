"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks";
import { logoutUser } from "@/lib/redux/slices/authSlice";
import { Activity } from "lucide-react";
import { Button } from "../components/ui/button";
import Link from "next/link";

export default function DashboardPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { user, isAuthenticated, isLoading } = useAppSelector((state) => state.auth);

    // Redirect to login if not authenticated
    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push("/components/login");
        }
    }, [isAuthenticated, isLoading, router]);

    const handleLogout = async () => {
        await dispatch(logoutUser());
        router.push("/");
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="h-12 w-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return null; // Will redirect via useEffect
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <Activity className="h-6 w-6 text-emerald-600" />
                        <span className="text-xl font-bold text-emerald-600">Healithm</span>
                    </Link>

                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">
                            Welcome, <span className="font-medium text-gray-900">{user?.email}</span>
                        </span>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">
                            Dashboard
                        </h1>
                        <p className="text-lg text-gray-600 mb-6">
                            Welcome to your health tracking dashboard! This is where you'll manage your health journey.
                        </p>

                        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
                            <h2 className="text-xl font-semibold text-emerald-900 mb-3">
                                🎉 You're successfully logged in!
                            </h2>
                            <p className="text-emerald-800 mb-4">
                                Your dashboard is currently under construction. Soon you'll be able to:
                            </p>
                            <ul className="space-y-2 text-emerald-800">
                                <li className="flex items-start gap-2">
                                    <span className="text-emerald-600 mt-1">✓</span>
                                    <span>Track your daily calories, macros, and water intake</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-emerald-600 mt-1">✓</span>
                                    <span>Monitor your weight progress with interactive charts</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-emerald-600 mt-1">✓</span>
                                    <span>Get AI-powered meal and workout recommendations</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-emerald-600 mt-1">✓</span>
                                    <span>View detailed analytics and progress reports</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="font-semibold text-gray-900 mb-2">Quick Stats</h3>
                            <p className="text-sm text-gray-600">Your health metrics at a glance</p>
                            <div className="mt-4 text-3xl font-bold text-emerald-600">Coming Soon</div>
                        </div>

                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="font-semibold text-gray-900 mb-2">Today's Goals</h3>
                            <p className="text-sm text-gray-600">Track your daily progress</p>
                            <div className="mt-4 text-3xl font-bold text-emerald-600">Coming Soon</div>
                        </div>

                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="font-semibold text-gray-900 mb-2">AI Insights</h3>
                            <p className="text-sm text-gray-600">Personalized recommendations</p>
                            <div className="mt-4 text-3xl font-bold text-emerald-600">Coming Soon</div>
                        </div>
                    </div>

                    <div className="mt-8 text-center">
                        <Link href="/">
                            <Button variant="outline" size="lg">
                                ← Back to Home
                            </Button>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
