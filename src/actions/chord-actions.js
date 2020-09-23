const axios = require('axios');
const {API_BASE_URL} = require('../config');

export const CHORD_REQUEST = 'CHORD_REQUEST';
export const chordRequest = () => ({
    type:CHORD_REQUEST
});

export const CHORD_SUCCESS = 'CHORD_SUCCESS';
export const chordSuccess = (chords) => ({
    type:CHORD_SUCCESS,
    chords
});

export const CHORD_ERROR = ' CHORD_ERROR';
export const chordError = (error) => ({
    type:CHORD_ERROR,
    error
});

export const getChordsDispatch = (instrument) => async (dispatch,getState) => {

    dispatch(chordRequest());
    
    const authToken = getState().auth.authToken;
    let url = `${API_BASE_URL}/chords?instrument=${instrument}`;
    const headers = {
        headers:{
            Authorization: `Bearer ${authToken}`
        }
    }
    try{
        const response = await axios.get(url,headers);
        console.log(response);
        dispatch(chordSuccess(response.data.chords));
        return response;
    }
    catch(e){
        dispatch(chordError());
        throw e;  
    }
}
//simple actions require auth token
export const getChords = async (instrument,authToken) => {
    let url = `${API_BASE_URL}/chords?instrument=${instrument}`;
    const headers = {
        headers:{
            Authorization: `Bearer ${authToken}`
        }
    }
    try{
        const response = await axios.get(url,headers);
        console.log(response);
        //debugger;
        return response;
    }
    catch(e){
        throw e;
    }
}
