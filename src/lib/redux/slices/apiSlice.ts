import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { HealthMetrics, DailyLog, WeightEntry } from './healthSlice';

// Define types for API responses
interface MealRecommendation {
    id: string;
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    ingredients: string[];
    instructions: string[];
    imageUrl?: string;
}

interface WorkoutRecommendation {
    id: string;
    name: string;
    duration: number;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    caloriesBurned: number;
    exercises: Array<{
        name: string;
        sets?: number;
        reps?: number;
        duration?: number;
    }>;
}

interface NutritionAnalysis {
    totalCalories: number;
    macros: {
        protein: number;
        carbs: number;
        fats: number;
    };
    recommendations: string[];
}

// Base URL - this should be configured based on your environment
const baseUrl = process.env.NEXT_PUBLIC_API_URL || '/api';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: async (headers) => {
            // Add authentication token if available
            // You can get this from Supabase session
            const token = localStorage.getItem('supabase.auth.token');
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['HealthMetrics', 'DailyLogs', 'WeightHistory', 'Recommendations'],
    endpoints: (builder) => ({
        // Health Metrics
        getHealthMetrics: builder.query<HealthMetrics, string>({
            query: (userId) => `/health/metrics/${userId}`,
            providesTags: ['HealthMetrics'],
        }),
        updateHealthMetrics: builder.mutation<HealthMetrics, { userId: string; metrics: HealthMetrics }>({
            query: ({ userId, metrics }) => ({
                url: `/health/metrics/${userId}`,
                method: 'PUT',
                body: metrics,
            }),
            invalidatesTags: ['HealthMetrics'],
        }),

        // Daily Logs
        getDailyLogs: builder.query<DailyLog[], { userId: string; startDate: string; endDate: string }>({
            query: ({ userId, startDate, endDate }) =>
                `/health/logs/${userId}?start=${startDate}&end=${endDate}`,
            providesTags: ['DailyLogs'],
        }),
        addDailyLog: builder.mutation<DailyLog, { userId: string; log: Omit<DailyLog, 'id'> }>({
            query: ({ userId, log }) => ({
                url: `/health/logs/${userId}`,
                method: 'POST',
                body: log,
            }),
            invalidatesTags: ['DailyLogs'],
        }),
        updateDailyLog: builder.mutation<DailyLog, { userId: string; logId: string; log: Partial<DailyLog> }>({
            query: ({ userId, logId, log }) => ({
                url: `/health/logs/${userId}/${logId}`,
                method: 'PATCH',
                body: log,
            }),
            invalidatesTags: ['DailyLogs'],
        }),
        deleteDailyLog: builder.mutation<void, { userId: string; logId: string }>({
            query: ({ userId, logId }) => ({
                url: `/health/logs/${userId}/${logId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['DailyLogs'],
        }),

        // Weight History
        getWeightHistory: builder.query<WeightEntry[], string>({
            query: (userId) => `/health/weight/${userId}`,
            providesTags: ['WeightHistory'],
        }),
        addWeightEntry: builder.mutation<WeightEntry, { userId: string; entry: Omit<WeightEntry, 'id'> }>({
            query: ({ userId, entry }) => ({
                url: `/health/weight/${userId}`,
                method: 'POST',
                body: entry,
            }),
            invalidatesTags: ['WeightHistory'],
        }),

        // AI Recommendations
        getMealRecommendations: builder.query<MealRecommendation[], { userId: string; preferences?: string[] }>({
            query: ({ userId, preferences }) => ({
                url: `/ai/meals/${userId}`,
                params: { preferences: preferences?.join(',') },
            }),
            providesTags: ['Recommendations'],
        }),
        getWorkoutRecommendations: builder.query<WorkoutRecommendation[], { userId: string; goals?: string[] }>({
            query: ({ userId, goals }) => ({
                url: `/ai/workouts/${userId}`,
                params: { goals: goals?.join(',') },
            }),
            providesTags: ['Recommendations'],
        }),

        // Nutrition Analysis
        analyzeNutrition: builder.mutation<NutritionAnalysis, { userId: string; foodItems: string[] }>({
            query: ({ userId, foodItems }) => ({
                url: `/ai/analyze-nutrition/${userId}`,
                method: 'POST',
                body: { foodItems },
            }),
        }),

        // Progress Analytics
        getProgressAnalytics: builder.query<any, { userId: string; period: 'week' | 'month' | 'year' }>({
            query: ({ userId, period }) => `/analytics/progress/${userId}?period=${period}`,
        }),
    }),
});

// Export hooks for usage in functional components
export const {
    useGetHealthMetricsQuery,
    useUpdateHealthMetricsMutation,
    useGetDailyLogsQuery,
    useAddDailyLogMutation,
    useUpdateDailyLogMutation,
    useDeleteDailyLogMutation,
    useGetWeightHistoryQuery,
    useAddWeightEntryMutation,
    useGetMealRecommendationsQuery,
    useGetWorkoutRecommendationsQuery,
    useAnalyzeNutritionMutation,
    useGetProgressAnalyticsQuery,
} = apiSlice;
