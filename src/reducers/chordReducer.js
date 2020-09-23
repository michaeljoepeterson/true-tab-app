import {
    CHORD_SUCCESS,
    CHORD_REQUEST,
    CHORD_ERROR
} from '../actions/chord-actions';

import {chordReqRefresh} from '../config';

const initialState = {
    error:null,
    loading:false,
    chords:null,
    chordReqs:0
};


export default function reducer(state = initialState,action){
    if(action.type === CHORD_REQUEST){
        let {chordReqs} = state;
        chordReqs += 1;
        if(chordReqs > chordReqRefresh){
            chordReqs = 0;
        }

        return Object.assign({},state,{
            loading:true,
            error:null,
            chordReqs
        });
    }

    else if(action.type === CHORD_ERROR){
        return Object.assign({},state,{
            loading:false,
            error:action.error,
            currentUser:null,
            authToken:null
        });
    }
    
    else if(action.type === CHORD_SUCCESS){
        let {chords} = action;

        if(!chords){
            chords = state.chords;
        }

        return Object.assign({},state,{
            loading:false,
            error:null,
            chords
        });
    }
    
    return state;
}