import { MY_PROFILE_SEARCH_REQUEST,  MY_PROFILE_SEARCH_SUCCESS,  MY_PROFILE_SEARCH_ERROR } from "../../types/types";
export default function accountInfo(state = "", action) {
	const { type, payload } = action;
	switch (type) {
		case MY_PROFILE_SEARCH_REQUEST:
			return {
				loading: true,
				success: true,
			};
		case  MY_PROFILE_SEARCH_SUCCESS:
			return {
				...state,
				loading: false,
				success: false,
				payload: payload,
			};

		case  MY_PROFILE_SEARCH_ERROR:
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
