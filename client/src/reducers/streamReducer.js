import _ from 'lodash';
import {
	CREATE_STREAM,
	DELETE_STREAM,
	EDIT_STREAM,
	FETCH_STREAM,
	FETCH_STREAMS,
} from '../actions/types';

export default (state = {}, action) => {
	switch (action.type) {
		case FETCH_STREAMS:
			//creating a new object
			// taking all the current records in our state object and adding them in by ...state
			// then we call mapKeys with lodash taking the list of streams that we got from the api
			// and creating an object out of it using mapKeys and the Keys inside of that object will be the ids of the indivdual streams themselves.
			// mapKeys returns a big oejct, we want to take all the key value pairs from that object and adding them into a new object that gets created, thats
			// why the ... are before _.mapkeys
			return { ...state, ..._.mapKeys(action.payload, 'id') };
		case FETCH_STREAM:
			return { ...state, [action.payload.id]: action.payload };
		case EDIT_STREAM:
			return { ...state, [action.payload.id]: action.payload };
		case CREATE_STREAM:
			return { ...state, [action.payload.id]: action.payload };
		case DELETE_STREAM:
			return _.omit(state, action.payload);
		default:
			return state;
	}
};
