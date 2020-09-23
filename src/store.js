import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/authReducer';
import chordReducer from './reducers/chordReducer';

export default createStore(
	combineReducers({
		auth:authReducer,
		chords:chordReducer
	}),applyMiddleware(thunk)
);