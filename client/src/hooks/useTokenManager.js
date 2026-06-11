import { useRef, useCallback } from 'react';
import { api } from '../API/APIService';

export function useTokenManager() {
    const lastActivityRef = useRef(Date.now());
    const refreshTimeoutRef = useRef(null);
    const ACTIVITY_TIMEOUT = 30 * 60 * 1000; // 30 דקות
    const REFRESH_BEFORE_EXPIRE = 5 * 60 * 1000; // 5 דקות לפני פקיעה

    const updateActivity = useCallback(() => {
        lastActivityRef.current = Date.now();
    }, []);

    const scheduleTokenRefresh = useCallback(() => {
        if (refreshTimeoutRef.current) {
            clearTimeout(refreshTimeoutRef.current);
        }

        refreshTimeoutRef.current = setTimeout(async () => {
            const timeSinceActivity = Date.now() - lastActivityRef.current;
            
            if (timeSinceActivity < ACTIVITY_TIMEOUT) {
                try {
                    await api.post('auth/refresh-token');
                    scheduleTokenRefresh();
                } catch (error) {
                    console.log('Token refresh failed:', error);
                }
            }
        }, 25 * 60 * 1000); // רענן כל 25 דקות
    }, []);

    return { updateActivity, scheduleTokenRefresh };
}