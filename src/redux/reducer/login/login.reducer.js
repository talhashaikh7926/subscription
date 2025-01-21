import { POST_LOGIN_REQUEST, POST_LOGIN_SUCCESS, POST_LOGIN_ERROR } from "../../types/types";
export default function login(state = "", action) {
	const { type, payload } = action;
	switch (type) {
		case POST_LOGIN_REQUEST:
			return {
				loading: true,
				success: true,
			};
		case POST_LOGIN_SUCCESS:
			return {
				...state,
				loading: false,
				success: false,
				payload: payload,
			};

		case POST_LOGIN_ERROR:
			return {
				...state,
				loading: false,
				success: false,
				payload: payload,
			};

		default:
			return state;
	}
}
