import { PUT_PROFILE_REQUEST, PUT_PROFILE_SUCCESS, PUT_PROFILE_ERROR } from "../../types/types";
export default function update(state = "", action) {
	const { type, payload } = action;
	switch (type) {
		case PUT_PROFILE_REQUEST:
			return {
				loading: true,
				success: true,
			};
		case PUT_PROFILE_SUCCESS:
			return {
				...state,
				loading: false,
				success: false,
				payload: payload,
			};

		case PUT_PROFILE_ERROR:
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
