import SecureStore from 'expo-secure-store';
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
    try {
        response = await axios.post(`${API_URL}/api/v1/auth/login`, credentials);
    } catch (error) {
        console.log((error as Error).message);
        return;
    }
    const { token } = response.data.token;
    await SecureStore.setItemAsync('authToken', token);
    store.dispatch(login({name: response.data.user.name, image: response.data.user.image}));
};

export const apiSignup = async (credentials: signupParams) => {
    let response;
    try {
        response = await axios.post(`${API_URL}/api/v1/auth/signup`, credentials);
    } catch (error) {
        console.log((error as Error).message);
        return;
    }
    const { token } = response.data.token;
    await SecureStore.setItemAsync('authToken', token);
    store.dispatch(login({name: response.data.user.name, image: response.data.user.image}));
};

export const getToken = async () => {
  return await SecureStore.getItemAsync('authToken');
};

export const apiLogout = async () => {
  await SecureStore.deleteItemAsync('authToken');
  store.dispatch(logout());
};
