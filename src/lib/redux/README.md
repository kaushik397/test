# Redux State Management - Healithm

This directory contains the complete Redux state management setup for the Healithm health tracking application.

## 📁 Structure

```
lib/redux/
├── store.ts              # Redux store configuration
├── hooks.ts              # Typed Redux hooks
├── ReduxProvider.tsx     # Provider component for Next.js
├── slices/
│   ├── authSlice.ts      # Authentication state management
│   ├── healthSlice.ts    # Health data state management
│   └── apiSlice.ts       # RTK Query API endpoints
└── USAGE_EXAMPLES.tsx    # Code examples and documentation
```

## 🚀 Quick Start

### 1. Using Redux Hooks

```tsx
"use client";
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';

export function MyComponent() {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  
  // Your component logic
}
```

### 2. Using RTK Query for API Calls

```tsx
"use client";
import { useGetHealthMetricsQuery } from '@/lib/redux/slices/apiSlice';

export function HealthDashboard() {
  const userId = 'user-123';
  const { data, isLoading, error } = useGetHealthMetricsQuery(userId);
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;
  
  return <div>Weight: {data?.weight} kg</div>;
}
```

## 📦 State Slices

### Auth Slice (`authSlice.ts`)

Manages user authentication state and operations.

**State:**
- `user`: Current user object
- `isAuthenticated`: Boolean authentication status
- `isLoading`: Loading state for auth operations
- `error`: Error messages

**Actions:**
- `loginUser({ email, password })` - Login with credentials
- `signupUser({ email, password })` - Create new account
- `logoutUser()` - Sign out current user
- `checkAuthStatus()` - Verify authentication status
- `clearError()` - Clear error messages
- `setUser(user)` - Manually set user

**Example:**
```tsx
const dispatch = useAppDispatch();
const result = await dispatch(loginUser({ email, password }));

if (loginUser.fulfilled.match(result)) {
  // Login successful
  router.push('/dashboard');
}
```

### Health Slice (`healthSlice.ts`)

Manages health metrics, daily logs, and weight tracking.

**State:**
- `metrics`: User's health metrics (weight, height, age, etc.)
- `dailyLogs`: Array of daily health logs
- `weightHistory`: Historical weight entries
- `currentDailyLog`: Today's log
- `isLoading`: Loading state
- `error`: Error messages

**Actions:**
- `fetchHealthMetrics(userId)` - Get user's health metrics
- `updateHealthMetrics({ userId, metrics })` - Update metrics
- `fetchDailyLogs({ userId, startDate, endDate })` - Get logs
- `addDailyLog({ userId, log })` - Add new daily log
- `fetchWeightHistory(userId)` - Get weight history
- `addWeightEntry({ userId, entry })` - Add weight entry
- `updateLocalMetrics(metrics)` - Update metrics locally
- `setCurrentDailyLog(log)` - Set current log
- `clearHealthError()` - Clear errors

**Example:**
```tsx
const dispatch = useAppDispatch();
await dispatch(addDailyLog({
  userId: user.id,
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
```

### API Slice (`apiSlice.ts`)

RTK Query endpoints for efficient API calls with automatic caching.

**Endpoints:**

**Health Metrics:**
- `useGetHealthMetricsQuery(userId)` - Fetch metrics
- `useUpdateHealthMetricsMutation()` - Update metrics

**Daily Logs:**
- `useGetDailyLogsQuery({ userId, startDate, endDate })` - Fetch logs
- `useAddDailyLogMutation()` - Add log
- `useUpdateDailyLogMutation()` - Update log
- `useDeleteDailyLogMutation()` - Delete log

**Weight Tracking:**
- `useGetWeightHistoryQuery(userId)` - Fetch weight history
- `useAddWeightEntryMutation()` - Add weight entry

**AI Recommendations:**
- `useGetMealRecommendationsQuery({ userId, preferences })` - Get meal suggestions
- `useGetWorkoutRecommendationsQuery({ userId, goals })` - Get workout plans
- `useAnalyzeNutritionMutation()` - Analyze nutrition

**Analytics:**
- `useGetProgressAnalyticsQuery({ userId, period })` - Get progress analytics

**Example:**
```tsx
const [updateMetrics, { isLoading }] = useUpdateHealthMetricsMutation();

const handleUpdate = async () => {
  try {
    await updateMetrics({
      userId: user.id,
      metrics: { weight: 75, height: 175 }
    }).unwrap();
    toast.success('Metrics updated!');
  } catch (error) {
    toast.error('Update failed');
  }
};
```

## 🔧 Configuration

### Environment Variables

Set your API base URL in `.env.local`:

```env
NEXT_PUBLIC_API_URL=https://api.healithm.com
```

If not set, defaults to `/api` for local development.

### Authentication

The API slice automatically includes authentication tokens in requests:

```typescript
prepareHeaders: async (headers) => {
  const token = localStorage.getItem('supabase.auth.token');
  if (token) {
    headers.set('authorization', `Bearer ${token}`);
  }
  return headers;
}
```

## 🎯 Best Practices

### 1. Use Typed Hooks

Always use `useAppDispatch` and `useAppSelector` instead of the plain Redux hooks for full TypeScript support.

```tsx
// ✅ Good
import { useAppSelector } from '@/lib/redux/hooks';
const user = useAppSelector((state) => state.auth.user);

// ❌ Bad
import { useSelector } from 'react-redux';
const user = useSelector((state: any) => state.auth.user);
```

### 2. Prefer RTK Query for API Calls

Use RTK Query hooks instead of async thunks when possible for automatic caching and refetching.

```tsx
// ✅ Good - Automatic caching, refetching, loading states
const { data, isLoading } = useGetHealthMetricsQuery(userId);

// ❌ Less optimal - Manual cache management
const dispatch = useAppDispatch();
useEffect(() => {
  dispatch(fetchHealthMetrics(userId));
}, [userId]);
```

### 3. Handle Loading and Error States

Always handle loading and error states in your components.

```tsx
const { data, isLoading, error } = useGetHealthMetricsQuery(userId);

if (isLoading) return <Spinner />;
if (error) return <ErrorMessage error={error} />;
if (!data) return <EmptyState />;

return <HealthMetrics data={data} />;
```

### 4. Use Optimistic Updates

For better UX, use optimistic updates with RTK Query mutations.

```tsx
const [addLog] = useAddDailyLogMutation();

await addLog({
  userId,
  log: newLog,
  // Optimistically update the cache
  onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
    const patchResult = dispatch(
      apiSlice.util.updateQueryData('getDailyLogs', arg, (draft) => {
        draft.push(newLog);
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

### 5. Invalidate Tags for Fresh Data

RTK Query automatically invalidates and refetches data based on tags.

```tsx
// When you add a daily log, it automatically refetches all daily logs
const [addLog] = useAddDailyLogMutation(); // invalidatesTags: ['DailyLogs']
const { data: logs } = useGetDailyLogsQuery(...); // providesTags: ['DailyLogs']

// After addLog completes, logs are automatically refetched
```

## 🔄 Migration from Existing Code

To migrate existing components to use Redux:

1. **Wrap with ReduxProvider** (already done in `layout.tsx`)
2. **Replace local state with Redux state**
3. **Replace fetch calls with RTK Query hooks**
4. **Use typed hooks for type safety**

Example migration:

```tsx
// Before
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(false);

useEffect(() => {
  setLoading(true);
  fetch('/api/user')
    .then(res => res.json())
    .then(data => setUser(data))
    .finally(() => setLoading(false));
}, []);

// After
const { user, isLoading } = useAppSelector((state) => state.auth);
```

## 📚 Additional Resources

- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [RTK Query Documentation](https://redux-toolkit.js.org/rtk-query/overview)
- [React Redux Hooks](https://react-redux.js.org/api/hooks)
- See `USAGE_EXAMPLES.tsx` for more code examples

## 🐛 Troubleshooting

### "Cannot find module" errors

Make sure all files are saved and TypeScript has processed them. Restart your dev server if needed.

### RTK Query not refetching

Check that your endpoints have proper `providesTags` and `invalidatesTags` configuration.

### Authentication token not included

Ensure Supabase session is properly stored and the token is accessible in `localStorage`.

### Type errors with state

Always use the typed hooks (`useAppDispatch`, `useAppSelector`) for full TypeScript support.
