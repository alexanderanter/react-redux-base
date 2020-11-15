import streams from '../apis/streams';
import history from '../history';
import {
	SIGN_IN,
	SIGN_OUT,
	CREATE_STREAM,
	DELETE_STREAM,
	EDIT_STREAM,
	FETCH_STREAM,
	FETCH_STREAMS,
} from './types';

export const signIn = (userId) => {
	return {
		type: SIGN_IN,
		payload: userId,
	};
};

export const signOut = () => {
	return {
		type: SIGN_OUT,
	};
};

// export const createStream = (formValues, history) => {
export const createStream = (category, formValues) => {
	return async (dispatch, getState) => {
		//take out userId from state
		const { userId } = getState().auth;
		//add the userId to the form value
		const response = await streams.post(category, { ...formValues, userId });
		dispatch({
			type: CREATE_STREAM,
			payload: response.data,
		});
		history.push('/');
		// if (history) history.push('/');
	};
};

export const fetchStreams = (category) => async (dispatch) => {
	const response = await streams.get(category);
	dispatch({ type: FETCH_STREAMS, payload: response.data });
};

export const fetchStream = (category, id) => async (dispatch) => {
	const response = await streams.get(`${category}/${id}`);
	dispatch({ type: FETCH_STREAM, payload: response.data });
};

export const editStream = (category, id, formValues) => async (dispatch) => {
	const response = await streams.patch(`${category}/${id}`, formValues);
	dispatch({ type: EDIT_STREAM, payload: response.data });
	history.push('/');
};

export const deleteStream = (category, id) => async (dispatch) => {
	await streams.delete(`${category}/${id}`);
	dispatch({ type: DELETE_STREAM, payload: id });

	history.push('/');
};
