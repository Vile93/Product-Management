import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/auth.reducer';
import locationReducer from './reducers/location.reducer';
import toastReducer from './reducers/toast.reducer';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        location: locationReducer,
        toast: toastReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
