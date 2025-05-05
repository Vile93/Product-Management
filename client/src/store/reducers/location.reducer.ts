import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ILocationState {
    location: string;
}

const initialState: ILocationState = {
    location: window.location.pathname,
};

const locationReducer = createSlice({
    name: 'location',
    initialState,
    reducers: {
        setLocation: (state, action: PayloadAction<string>) => {
            state.location = action.payload;
            window.history.pushState({}, '', action.payload);
        },
    },
});

export const { setLocation } = locationReducer.actions;

export default locationReducer.reducer;
