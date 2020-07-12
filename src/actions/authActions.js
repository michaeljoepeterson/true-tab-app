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

export const createAdmin = (email,password) => (dispatch) => {
    const admin = 'tt9u1qqbssZ234tqsSSAdfXUmV';
    const secret = 'ttJvBk23fvd7jGTI97tQ';
    const url = `${API_BASE_URL}/users/admin?secret=${secret}&admin=${admin}`;
    const level = 0;
    const options = {
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            email,
            password,
            level
        })
    };
    dispatch(authRequest());
    return(
        fetch(url,options)

        .then(res => {
            return normalizeResponseErrors(res)
        })

        .then(res => {
            return res.json()
        })

        .then(jsonRes => {
            //console.log(jsonRes);
            if(jsonRes.code === 401){
                throw jsonRes;
                //dispatch(authError(jsonRes.message));
            }
            else if(jsonRes.code === 500){
                throw jsonRes;
                //dispatch(authError(jsonRes.message));
            }
            else if(jsonRes.code === 400){
                throw jsonRes;
                //dispatch(authError(jsonRes.message));
            }
            else{
                dispatch(authSuccess(null,null));
            }
        })

        .catch(err => {
            console.log('error creating admin: ',err);
            dispatch(authError(err.message));
            throw err;
        })
    )
}

const storeAuthInfo = (authToken, dispatch) => {
    const decodedToken = jwtDecode(authToken);
    dispatch(authSuccess(decodedToken.user,authToken));
    saveAuthToken(authToken);
}

export const login = (email,password) => (dispatch,getState) => {
    /*
    const testMode = getState().auth.testMode;
    if(testMode){     
        console.log('is test mode');
        setTestUrl();
        dispatch(enableTestMode())
    }
    */
    dispatch(authRequest());
    return (
        fetch(`${API_BASE_URL}/auth/login`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                email,
                password
            })
        })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then((jsonRes) => {
            storeAuthInfo(jsonRes.authToken,dispatch)
        })
        .catch(err => {
            console.log('error logging in',err);
            dispatch(authError(err.message));
            throw err
        })
    );
};