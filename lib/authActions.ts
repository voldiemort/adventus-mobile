import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { API_URL } from './utils';
import { store } from '@/app/store';
import { login, logout } from '@/redux/authSlice';

interface loginParams {
    email: string;
    password: string;
}

interface signupParams {
    email: string;
    name: string;
    password: string;
    verifyPassword: string;
}

export const apiLogin = async (credentials: loginParams) => {
    let response;
    response = await axios.post(`${API_URL}/api/v1/auth/login`, credentials);
    if (!response) {
        console.error('Could not reach server');
        return;
    };
    const { token } = response.data;
    const { name, image } = response.data.user;
    await SecureStore.setItemAsync('authToken', JSON.stringify(token));
    store.dispatch(login({name: name, image: image}));
};

export const apiSignup = async (credentials: signupParams) => {
    let response;
    response = await axios.post(`${API_URL}/api/v1/auth/signup`, credentials)
    if (!response) {
        console.error('Could not reach server');
        return;
    }
    const { token } = response.data;
    const { name, image } = response.data.user;
    await SecureStore.setItemAsync('authToken', JSON.stringify(token));
    store.dispatch(login({name: name, image: image}));
};

export const getToken = async () => {
  return await SecureStore.getItemAsync('authToken');
};

export const apiLogout = async () => {
    const token = await getToken();
    if (token) {
        await SecureStore.deleteItemAsync('authToken');
    }
    store.dispatch(logout());
};
