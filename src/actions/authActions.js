import {API_BASE_URL} from '../config';
import {saveAuthToken,clearAuthToken,loadAuthToken} from '../local-storage';
import jwtDecode from 'jwt-decode';
import {normalizeResponseErrors} from './utils';

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const authRequest = () => ({
    type:AUTH_REQUEST
});

export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const authSuccess = (currentUser,token) => ({
    type:AUTH_SUCCESS,
    currentUser,
    token
});

export const AUTH_ERROR = 'AUTH_ERROR';
export const authError = (error) => ({
    type:AUTH_ERROR,
    error
});

export const LOGOUT = "LOGOUT";
export const logoutSession = () => ({
    type:LOGOUT
});