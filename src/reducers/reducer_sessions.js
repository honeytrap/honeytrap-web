import { ADD_SESSION, FETCH_SESSIONS, FETCH_SESSION, FETCH_SESSION_CONTENT } from '../actions/index';

const INITIAL_STATE = { all: [], session: null, content: [] };

export default function(state = INITIAL_STATE, action) {
	switch(action.type) {
	case ADD_SESSION:
		return { ...state, all: [action.payload, ...state.all] };
	case FETCH_SESSIONS:
		return { ...state, all: action.payload.data };
	case FETCH_SESSION:
		return { ...state, session: action.payload.data };
	case FETCH_SESSION_CONTENT:
		return { ...state, content: [ ...state.content, action.payload, ] }
	}
	

	return state;
}