import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    user: null,
    type: "",
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true;
            state.type = action.payload.type;
            state.user = action.payload.user;
        },
        logout: state => {
            state.isAuthenticated = false;
            state.user = null;
            state.type = "";
        },
        isLogin: (state, action) => {
            state.isAuthenticated = true;
            state.type = action.payload.type;
            state.user = action.payload.user;
        }
    },
});

export const { login, logout, isLogin } = authSlice.actions;

export default authSlice.reducer;