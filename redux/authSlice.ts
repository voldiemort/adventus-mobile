import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/app/store";

export interface AuthState {
    isAuthenticated: boolean,
    name: string | null,
    image: string | null
}

const initialState: AuthState = {
    isAuthenticated: false,
    name: null,
    image: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true;
            state.name = action.payload.name;
            state.image = action.payload.image;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.name = null;
            state.image = null;
        },
    }
});

export const { login, logout } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth.isAuthenticated;
export const selectName = (state: RootState) => state.auth.name;
export const selectImage = (state: RootState) => state.auth.image;

export default authSlice.reducer;