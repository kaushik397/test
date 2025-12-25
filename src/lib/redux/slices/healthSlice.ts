import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Types
export interface HealthMetrics {
    weight?: number;
    height?: number;
    age?: number;
    gender?: 'male' | 'female' | 'other';
    targetWeight?: number;
    activityLevel?: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
}

export interface DailyLog {
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

export interface WeightEntry {
    id: string;
    date: string;
    weight: number;
}

interface HealthState {
    metrics: HealthMetrics;
    dailyLogs: DailyLog[];
    weightHistory: WeightEntry[];
    currentDailyLog: DailyLog | null;
    isLoading: boolean;
    error: string | null;
}

// Initial state
const initialState: HealthState = {
    metrics: {},
    dailyLogs: [],
    weightHistory: [],
    currentDailyLog: null,
    isLoading: false,
    error: null,
};

// Async thunks for health data operations
export const fetchHealthMetrics = createAsyncThunk(
    'health/fetchMetrics',
    async (userId: string, { rejectWithValue }) => {
        try {
            // This will be replaced with actual API call
            const response = await fetch(`/api/health/metrics/${userId}`);
            if (!response.ok) throw new Error('Failed to fetch metrics');
            const data = await response.json();
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to fetch health metrics');
        }
    }
);

export const updateHealthMetrics = createAsyncThunk(
    'health/updateMetrics',
    async ({ userId, metrics }: { userId: string; metrics: HealthMetrics }, { rejectWithValue }) => {
        try {
            // This will be replaced with actual API call
            const response = await fetch(`/api/health/metrics/${userId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(metrics),
            });
            if (!response.ok) throw new Error('Failed to update metrics');
            const data = await response.json();
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to update health metrics');
        }
    }
);

export const fetchDailyLogs = createAsyncThunk(
    'health/fetchDailyLogs',
    async ({ userId, startDate, endDate }: { userId: string; startDate: string; endDate: string }, { rejectWithValue }) => {
        try {
            // This will be replaced with actual API call
            const response = await fetch(`/api/health/logs/${userId}?start=${startDate}&end=${endDate}`);
            if (!response.ok) throw new Error('Failed to fetch daily logs');
            const data = await response.json();
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to fetch daily logs');
        }
    }
);

export const addDailyLog = createAsyncThunk(
    'health/addDailyLog',
    async ({ userId, log }: { userId: string; log: Omit<DailyLog, 'id'> }, { rejectWithValue }) => {
        try {
            // This will be replaced with actual API call
            const response = await fetch(`/api/health/logs/${userId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(log),
            });
            if (!response.ok) throw new Error('Failed to add daily log');
            const data = await response.json();
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to add daily log');
        }
    }
);

export const fetchWeightHistory = createAsyncThunk(
    'health/fetchWeightHistory',
    async (userId: string, { rejectWithValue }) => {
        try {
            // This will be replaced with actual API call
            const response = await fetch(`/api/health/weight/${userId}`);
            if (!response.ok) throw new Error('Failed to fetch weight history');
            const data = await response.json();
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to fetch weight history');
        }
    }
);

export const addWeightEntry = createAsyncThunk(
    'health/addWeightEntry',
    async ({ userId, entry }: { userId: string; entry: Omit<WeightEntry, 'id'> }, { rejectWithValue }) => {
        try {
            // This will be replaced with actual API call
            const response = await fetch(`/api/health/weight/${userId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(entry),
            });
            if (!response.ok) throw new Error('Failed to add weight entry');
            const data = await response.json();
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to add weight entry');
        }
    }
);

// Slice
const healthSlice = createSlice({
    name: 'health',
    initialState,
    reducers: {
        clearHealthError: (state) => {
            state.error = null;
        },
        setCurrentDailyLog: (state, action: PayloadAction<DailyLog | null>) => {
            state.currentDailyLog = action.payload;
        },
        updateLocalMetrics: (state, action: PayloadAction<Partial<HealthMetrics>>) => {
            state.metrics = { ...state.metrics, ...action.payload };
        },
    },
    extraReducers: (builder) => {
        // Fetch health metrics
        builder
            .addCase(fetchHealthMetrics.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchHealthMetrics.fulfilled, (state, action) => {
                state.isLoading = false;
                state.metrics = action.payload;
            })
            .addCase(fetchHealthMetrics.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });

        // Update health metrics
        builder
            .addCase(updateHealthMetrics.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateHealthMetrics.fulfilled, (state, action) => {
                state.isLoading = false;
                state.metrics = action.payload;
            })
            .addCase(updateHealthMetrics.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });

        // Fetch daily logs
        builder
            .addCase(fetchDailyLogs.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchDailyLogs.fulfilled, (state, action) => {
                state.isLoading = false;
                state.dailyLogs = action.payload;
            })
            .addCase(fetchDailyLogs.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });

        // Add daily log
        builder
            .addCase(addDailyLog.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addDailyLog.fulfilled, (state, action) => {
                state.isLoading = false;
                state.dailyLogs.push(action.payload);
                state.currentDailyLog = action.payload;
            })
            .addCase(addDailyLog.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });

        // Fetch weight history
        builder
            .addCase(fetchWeightHistory.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchWeightHistory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.weightHistory = action.payload;
            })
            .addCase(fetchWeightHistory.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });

        // Add weight entry
        builder
            .addCase(addWeightEntry.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addWeightEntry.fulfilled, (state, action) => {
                state.isLoading = false;
                state.weightHistory.push(action.payload);
            })
            .addCase(addWeightEntry.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearHealthError, setCurrentDailyLog, updateLocalMetrics } = healthSlice.actions;
export default healthSlice.reducer;
