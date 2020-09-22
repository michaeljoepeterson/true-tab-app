const axios = require('axios');
const {API_BASE_URL} = require('../config');
/*
export const getChords = async (instrument,execDisp) => async (dispatch,getState) => {
    if(execDisp){
        //dispatch(getLessonRequest());
    }
    const authToken = getState().auth.authToken;
    let url = `${API_BASE_URL}/?instrument=${instrument}`;
    const headers = {
        headers:{
            Authorization: `Bearer ${authToken}`
        }
    }
    const response = await axios.get(url,headers);
    console.log(response);
    dispatch({});
    return response;
}
*/
export const getChords = async (instrument,authToken,execDisp) => {
    if(execDisp){
        //dispatch(getLessonRequest());
    }
    //const authToken = getState().auth.authToken;
    let url = `${API_BASE_URL}/chords?instrument=${instrument}`;
    const headers = {
        headers:{
            Authorization: `Bearer ${authToken}`
        }
    }
    const response = await axios.get(url,headers);
    console.log(response);
    debugger;
    return response;
    /*
    return (
        fetch(`${API_BASE_URL}/lessons`,{
            method:'GET',
        })

        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then((lessons) => {
            dispatch(getLessonSuccess(lessons.lessons));
        })
        .catch(err => {
            console.log('error getting lessons ',err);
            dispatch(getLessonError(err));
        })
    );
    */
}
