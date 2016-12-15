import { FETCH_POSTS } from '../actions/index';

const INITIAL_STATE = { all: [], post: null};

export default function(state = INITIAL_STATE, action) {
	switch(action.type) {
		case FETCH_POSTS:
			return { ...state, all: action.payload.data };
			//reducer needs to return a new object whenever we return state
		default:
			return state;
	}
}