import moment from 'moment';

import { RECEIVED_METADATA, RECEIVED_HOT_COUNTRIES, CLEAR_HOT_COUNTRIES, CONNECTION_STATUS, RECEIVED_EVENT, ADD_SESSION, FETCH_SESSIONS, FETCH_SESSION, FETCH_SESSION_CONTENT } from '../actions/index';

const INITIAL_STATE = { all: [], events: [], session: null, content: [], metadata: null, hotCountries: [], connected: false};

export default function(state = INITIAL_STATE, action) {
    console.log(action.type, action);
	switch(action.type) {
	case CONNECTION_STATUS:
		  return { ...state, connected: action.payload.connected };
	case RECEIVED_METADATA: {
      let metadata = action.payload;
      metadata.start = moment(metadata.start);
      return { ...state, metadata: metadata };
  }
	case RECEIVED_HOT_COUNTRIES: {
      let payload = action.payload;
      return { ...state, hotCountries: payload };
  }
	case RECEIVED_EVENT: {
      let payload = action.payload;
      payload.date = moment(payload.date);
      return { ...state, ...payload, events: [payload, ...state.events]};
  }
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
