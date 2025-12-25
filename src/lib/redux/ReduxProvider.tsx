"use client";

import { Provider } from 'react-redux';
import { store } from './store';
import { useEffect } from 'react';
import { checkAuthStatus } from './slices/authSlice';

export function ReduxProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        // Check authentication status on mount
        store.dispatch(checkAuthStatus());
    }, []);

    return <Provider store={store}>{children}</Provider>;
}
