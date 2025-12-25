/**
 * Redux State Management - Usage Examples
 * 
 * This file demonstrates how to use the Redux store throughout your application.
 */

// ============================================================================
// EXAMPLE 1: Using Auth State in a Component
// ============================================================================

/*
"use client";
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { loginUser, logoutUser } from '@/lib/redux/slices/authSlice';

export function LoginExample() {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isLoading, error } = useAppSelector((state) => state.auth);

  const handleLogin = async (email: string, password: string) => {
    const result = await dispatch(loginUser({ email, password }));
    
    if (loginUser.fulfilled.match(result)) {
      console.log('Login successful!', result.payload);
      // Redirect to dashboard
    } else {
      console.error('Login failed:', result.payload);
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Welcome, {user?.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <button onClick={() => handleLogin('test@example.com', 'password')}>
          Login
        </button>
      )}
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
}
*/

// ============================================================================
// EXAMPLE 2: Using Health Data State
// ============================================================================

/*
"use client";
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { 
  updateLocalMetrics, 
  addDailyLog, 
  addWeightEntry 
} from '@/lib/redux/slices/healthSlice';

export function HealthTrackingExample() {
  const dispatch = useAppDispatch();
  const { metrics, dailyLogs, weightHistory, isLoading } = useAppSelector(
    (state) => state.health
  );

  // Update health metrics locally
  const updateMetrics = () => {
    dispatch(updateLocalMetrics({
      weight: 75,
      height: 175,
      age: 30,
      targetWeight: 70,
    }));
  };

  // Add a daily log
  const logToday = async () => {
    const userId = 'user-123'; // Get from auth state
    const result = await dispatch(addDailyLog({
      userId,
      log: {
        date: new Date().toISOString(),
        calories: 2000,
        protein: 150,
        carbs: 200,
        fats: 60,
        water: 8,
        steps: 10000,
      }
    }));
  };

  // Add weight entry
  const logWeight = async () => {
    const userId = 'user-123';
    await dispatch(addWeightEntry({
      userId,
      entry: {
        date: new Date().toISOString(),
        weight: 74.5,
      }
    }));
  };

  return (
    <div>
      <h2>Current Metrics</h2>
      <p>Weight: {metrics.weight} kg</p>
      <p>Target: {metrics.targetWeight} kg</p>
      
      <button onClick={updateMetrics}>Update Metrics</button>
      <button onClick={logToday}>Log Today</button>
      <button onClick={logWeight}>Log Weight</button>
      
      {isLoading && <p>Loading...</p>}
    </div>
  );
}
*/

// ============================================================================
// EXAMPLE 3: Using RTK Query for API Calls
// ============================================================================

/*
"use client";
import {
  useGetHealthMetricsQuery,
  useUpdateHealthMetricsMutation,
  useGetMealRecommendationsQuery,
  useAddDailyLogMutation,
} from '@/lib/redux/slices/apiSlice';

export function RTKQueryExample() {
  const userId = 'user-123'; // Get from auth state
  
  // Fetch data with automatic caching and refetching
  const { data: metrics, isLoading, error, refetch } = useGetHealthMetricsQuery(userId);
  
  const { data: meals } = useGetMealRecommendationsQuery({
    userId,
    preferences: ['vegetarian', 'high-protein'],
  });

  // Mutations for updating data
  const [updateMetrics, { isLoading: isUpdating }] = useUpdateHealthMetricsMutation();
  const [addLog] = useAddDailyLogMutation();

  const handleUpdateMetrics = async () => {
    try {
      await updateMetrics({
        userId,
        metrics: {
          weight: 75,
          height: 175,
          age: 30,
        },
      }).unwrap();
      console.log('Metrics updated successfully!');
    } catch (error) {
      console.error('Failed to update metrics:', error);
    }
  };

  const handleAddLog = async () => {
    try {
      await addLog({
        userId,
        log: {
          date: new Date().toISOString(),
          calories: 2000,
          protein: 150,
          carbs: 200,
          fats: 60,
          water: 8,
          steps: 10000,
        },
      }).unwrap();
      console.log('Log added successfully!');
    } catch (error) {
      console.error('Failed to add log:', error);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  return (
    <div>
      <h2>Health Metrics</h2>
      <p>Weight: {metrics?.weight} kg</p>
      
      <h2>Meal Recommendations</h2>
      {meals?.map((meal) => (
        <div key={meal.id}>
          <h3>{meal.name}</h3>
          <p>{meal.calories} calories</p>
        </div>
      ))}
      
      <button onClick={handleUpdateMetrics} disabled={isUpdating}>
        Update Metrics
      </button>
      <button onClick={handleAddLog}>Add Daily Log</button>
      <button onClick={() => refetch()}>Refresh Data</button>
    </div>
  );
}
*/

// ============================================================================
// EXAMPLE 4: Combining Multiple State Slices
// ============================================================================

/*
"use client";
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { useGetProgressAnalyticsQuery } from '@/lib/redux/slices/apiSlice';

export function DashboardExample() {
  const dispatch = useAppDispatch();
  
  // Get auth state
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  
  // Get health state
  const { metrics, dailyLogs, weightHistory } = useAppSelector(
    (state) => state.health
  );
  
  // Fetch analytics using RTK Query
  const { data: analytics } = useGetProgressAnalyticsQuery(
    { userId: user?.id || '', period: 'month' },
    { skip: !user?.id } // Skip query if no user
  );

  if (!isAuthenticated) {
    return <p>Please log in to view your dashboard</p>;
  }

  return (
    <div>
      <h1>Welcome, {user?.email}</h1>
      
      <section>
        <h2>Your Metrics</h2>
        <p>Current Weight: {metrics.weight} kg</p>
        <p>Target Weight: {metrics.targetWeight} kg</p>
      </section>
      
      <section>
        <h2>Recent Logs</h2>
        {dailyLogs.slice(0, 5).map((log) => (
          <div key={log.id}>
            <p>{log.date}: {log.calories} calories</p>
          </div>
        ))}
      </section>
      
      <section>
        <h2>Weight Progress</h2>
        {weightHistory.slice(-7).map((entry) => (
          <div key={entry.id}>
            <p>{entry.date}: {entry.weight} kg</p>
          </div>
        ))}
      </section>
      
      <section>
        <h2>Monthly Analytics</h2>
        {analytics && (
          <pre>{JSON.stringify(analytics, null, 2)}</pre>
        )}
      </section>
    </div>
  );
}
*/

// ============================================================================
// EXAMPLE 5: Using Redux in Server Components (via Client Component Wrapper)
// ============================================================================

/*
// app/dashboard/page.tsx (Server Component)
import { DashboardClient } from './DashboardClient';

export default function DashboardPage() {
  return <DashboardClient />;
}

// app/dashboard/DashboardClient.tsx (Client Component)
"use client";
import { useAppSelector } from '@/lib/redux/hooks';
import { useGetHealthMetricsQuery } from '@/lib/redux/slices/apiSlice';

export function DashboardClient() {
  const { user } = useAppSelector((state) => state.auth);
  const { data: metrics } = useGetHealthMetricsQuery(user?.id || '', {
    skip: !user?.id,
  });

  return (
    <div>
      <h1>Dashboard</h1>
      {metrics && <p>Weight: {metrics.weight} kg</p>}
    </div>
  );
}
*/

export { };
