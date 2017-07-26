import axios from 'axios';

export const RECEIVED_EVENT = 'RECEIVED_EVENT';

export const ADD_SESSION = 'ADD_SESSION';
export const FETCH_SESSIONS = 'FETCH_SESSIONS';
export const FETCH_SESSION = 'FETCH_SESSION';
export const FETCH_SESSION_CONTENT = 'FETCH_SESSION_CONTENT';

const ROOT_URL = 'http://172.16.84.192:3000';

export function receivedEvent(event) {
	  return {
		    type: RECEIVED_EVENT,
        payload: event
	  };
}

export function addSession(id) {
	return {
		type: ADD_SESSION,
		payload: {
			id: id, 
			date: '10/02/2017', 
			location: 'unknown', 
			started: '10/02/2017 10:10', 
			ended: '10/02/2017 10:11', 
			username: 'root', 
			password: 'root' 
		}
	};
}

export function fetchSessions() {
	const request = axios.get(`${ROOT_URL}/api/v1/sessions`);

	return {
		type: FETCH_SESSIONS,
		payload: request
	}
}

export function fetchSession(id) {
	const request = axios.get(`${ROOT_URL}/api/v1/sessions/${id}`);

	return {
		type: FETCH_SESSION,
		payload: request
	}
}

export function fetchSessionContent(content) {

	return {
		type: FETCH_SESSION_CONTENT,
		payload: content
	}
}
