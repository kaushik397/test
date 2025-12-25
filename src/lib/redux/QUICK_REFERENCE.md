# Redux Quick Reference - Healithm

## 🎯 Common Patterns

### Import What You Need
```tsx
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { loginUser, logoutUser } from '@/lib/redux/slices/authSlice';
import { useGetHealthMetricsQuery } from '@/lib/redux/slices/apiSlice';
```

### Access State
```tsx
const { user, isAuthenticated } = useAppSelector((state) => state.auth);
const { metrics, dailyLogs } = useAppSelector((state) => state.health);
```

### Dispatch Actions
```tsx
const dispatch = useAppDispatch();
await dispatch(loginUser({ email, password }));
```

### Use RTK Query
```tsx
const { data, isLoading, error, refetch } = useGetHealthMetricsQuery(userId);
const [updateMetrics] = useUpdateHealthMetricsMutation();
```

## 📋 Cheat Sheet

### Auth Operations
```tsx
// Login
await dispatch(loginUser({ email, password }));

// Signup
await dispatch(signupUser({ email, password }));

// Logout
await dispatch(logoutUser());

// Check auth status
await dispatch(checkAuthStatus());

// Clear errors
dispatch(clearError());
```

### Health Data Operations
```tsx
// Update metrics locally
dispatch(updateLocalMetrics({ weight: 75, height: 175 }));

// Add daily log
await dispatch(addDailyLog({
  userId,
  log: { date, calories, protein, carbs, fats, water, steps }
}));

// Add weight entry
await dispatch(addWeightEntry({
  userId,
  entry: { date, weight }
}));
```

### RTK Query Hooks

#### Queries (GET)
```tsx
// Health metrics
const { data } = useGetHealthMetricsQuery(userId);

// Daily logs
const { data } = useGetDailyLogsQuery({ userId, startDate, endDate });

// Weight history
const { data } = useGetWeightHistoryQuery(userId);

// Meal recommendations
const { data } = useGetMealRecommendationsQuery({ userId, preferences });

// Workout recommendations
const { data } = useGetWorkoutRecommendationsQuery({ userId, goals });

// Progress analytics
const { data } = useGetProgressAnalyticsQuery({ userId, period: 'month' });
```

#### Mutations (POST/PUT/DELETE)
```tsx
// Update metrics
const [updateMetrics] = useUpdateHealthMetricsMutation();
await updateMetrics({ userId, metrics }).unwrap();

// Add daily log
const [addLog] = useAddDailyLogMutation();
await addLog({ userId, log }).unwrap();

// Update daily log
const [updateLog] = useUpdateDailyLogMutation();
await updateLog({ userId, logId, log }).unwrap();

// Delete daily log
const [deleteLog] = useDeleteDailyLogMutation();
await deleteLog({ userId, logId }).unwrap();

// Add weight entry
const [addWeight] = useAddWeightEntryMutation();
await addWeight({ userId, entry }).unwrap();

// Analyze nutrition
const [analyze] = useAnalyzeNutritionMutation();
await analyze({ userId, foodItems }).unwrap();
```

## 🎨 Component Templates

### Basic Component with Redux
```tsx
"use client";
import { useAppSelector } from '@/lib/redux/hooks';

export function MyComponent() {
  const { user } = useAppSelector((state) => state.auth);
  
  return <div>Hello {user?.email}</div>;
}
```

### Component with Dispatch
```tsx
"use client";
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { logoutUser } from '@/lib/redux/slices/authSlice';

export function Header() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  
  const handleLogout = () => {
    dispatch(logoutUser());
  };
  
  return (
    <header>
      <span>{user?.email}</span>
      <button onClick={handleLogout}>Logout</button>
    </header>
  );
}
```

### Component with RTK Query
```tsx
"use client";
import { useGetHealthMetricsQuery } from '@/lib/redux/slices/apiSlice';

export function HealthDashboard({ userId }: { userId: string }) {
  const { data, isLoading, error } = useGetHealthMetricsQuery(userId);
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;
  if (!data) return <div>No data</div>;
  
  return (
    <div>
      <p>Weight: {data.weight} kg</p>
      <p>Height: {data.height} cm</p>
    </div>
  );
}
```

### Component with Mutation
```tsx
"use client";
import { useState } from 'react';
import { useAddDailyLogMutation } from '@/lib/redux/slices/apiSlice';

export function AddLogForm({ userId }: { userId: string }) {
  const [calories, setCalories] = useState(0);
  const [addLog, { isLoading }] = useAddDailyLogMutation();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addLog({
        userId,
        log: {
          date: new Date().toISOString(),
          calories,
          protein: 0,
          carbs: 0,
          fats: 0,
          water: 0,
          steps: 0,
        }
      }).unwrap();
      alert('Log added!');
    } catch (error) {
      alert('Failed to add log');
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={calories}
        onChange={(e) => setCalories(Number(e.target.value))}
      />
      <button disabled={isLoading}>
        {isLoading ? 'Adding...' : 'Add Log'}
      </button>
    </form>
  );
}
```

### Protected Route Component
```tsx
"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/lib/redux/hooks';

export function ProtectedPage({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);
  
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/components/login');
    }
  }, [isAuthenticated, isLoading, router]);
  
  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return null;
  
  return <>{children}</>;
}
```

## 🔍 Debugging

### Redux DevTools
```tsx
// Already configured in store.ts
// Open Redux DevTools in browser to inspect state
```

### Log State Changes
```tsx
const state = useAppSelector((state) => state);
console.log('Current state:', state);
```

### Check Query Status
```tsx
const { data, isLoading, isFetching, isError, error } = useGetHealthMetricsQuery(userId);
console.log({ data, isLoading, isFetching, isError, error });
```

## ⚡ Performance Tips

### Skip Queries Conditionally
```tsx
const { data } = useGetHealthMetricsQuery(userId, {
  skip: !userId, // Don't run query if no userId
});
```

### Polling for Real-time Updates
```tsx
const { data } = useGetHealthMetricsQuery(userId, {
  pollingInterval: 30000, // Refetch every 30 seconds
});
```

### Manual Refetch
```tsx
const { data, refetch } = useGetHealthMetricsQuery(userId);

<button onClick={() => refetch()}>Refresh</button>
```

### Optimistic Updates
```tsx
const [updateMetrics] = useUpdateHealthMetricsMutation();

await updateMetrics({
  userId,
  metrics: newMetrics,
  // Optimistically update cache
  onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
    const patchResult = dispatch(
      apiSlice.util.updateQueryData('getHealthMetrics', userId, (draft) => {
        Object.assign(draft, newMetrics);
      })
    );
    try {
      await queryFulfilled;
    } catch {
      patchResult.undo();
    }
  },
});
```

## 🚨 Common Errors & Solutions

### "Cannot find module"
**Solution**: Restart dev server, TypeScript needs to process new files

### "useSelector/useDispatch not typed"
**Solution**: Use `useAppSelector` and `useAppDispatch` instead

### "Query not refetching"
**Solution**: Check `providesTags` and `invalidatesTags` configuration

### "Hydration mismatch"
**Solution**: Add `"use client"` directive to components using Redux

### "State not updating"
**Solution**: Check if you're mutating state directly (use Redux Toolkit's Immer)

## 📦 Type Definitions

```typescript
// Auth
interface User {
  id: string;
  email: string;
  user_metadata?: {
    name?: string;
    avatar_url?: string;
  };
}

// Health
interface HealthMetrics {
  weight?: number;
  height?: number;
  age?: number;
  gender?: 'male' | 'female' | 'other';
  targetWeight?: number;
  activityLevel?: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
}

interface DailyLog {
  id: string;
  date: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  water: number;
  steps: number;
  exercise?: string;
  notes?: string;
}

interface WeightEntry {
  id: string;
  date: string;
  weight: number;
}
```

---

**Quick Tip**: Bookmark this file for fast reference while coding!
