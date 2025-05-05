import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IToastState {
    message: string;
    type: 'success' | 'error' | null;
}

const initialState: IToastState = {
    message: '',
    type: null,
};

const toastReducer = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        showToast: (state, action: PayloadAction<{ message: string; type: 'success' | 'error' }>) => {
            state.message = action.payload.message;
            state.type = action.payload.type;
        },
        hideToast: state => {
            state.message = '';
            state.type = null;
        },
    },
});

export const { showToast, hideToast } = toastReducer.actions;

export default toastReducer.reducer;
