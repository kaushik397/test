// Redux Store
export { store } from './store';
export type { RootState, AppDispatch } from './store';

// Redux Hooks
export { useAppDispatch, useAppSelector } from './hooks';

// Redux Provider
export { ReduxProvider } from './ReduxProvider';

// Auth Slice
export {
    loginUser,
    signupUser,
    logoutUser,
    checkAuthStatus,
    clearError,
    setUser,
} from './slices/authSlice';
export type { User } from './slices/authSlice';

// Health Slice
export {
    fetchHealthMetrics,
    updateHealthMetrics,
    fetchDailyLogs,
    addDailyLog,
    fetchWeightHistory,
    addWeightEntry,
    clearHealthError,
    setCurrentDailyLog,
    updateLocalMetrics,
} from './slices/healthSlice';
export type {
    HealthMetrics,
    DailyLog,
    WeightEntry,
} from './slices/healthSlice';

// API Slice (RTK Query)
export {
    apiSlice,
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
} from './slices/apiSlice';
