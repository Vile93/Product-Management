import { createSlice } from '@reduxjs/toolkit';

interface IAuthState {
    isAuth: boolean;
}

const initialState: IAuthState = {
    isAuth: !!localStorage.getItem('token'),
};

const authReducer = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        unauth: state => {
            state.isAuth = false;
        },
        auth: state => {
            state.isAuth = true;
        },
    },
});

export const { unauth, auth } = authReducer.actions;

export default authReducer.reducer;
