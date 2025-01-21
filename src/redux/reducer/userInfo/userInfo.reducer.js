import {
    GET_INFO_REQUEST,
    GET_INFO_SUCCESS,
    GET_INFO_ERROR,
} from "../../types/types";
export default function getUserInfo(state = "", action) {
    const { type, payload } = action;
    switch (type) {
        case GET_INFO_REQUEST:
            return {
                loading: true,
                success: true,
            };
        case GET_INFO_SUCCESS:
            return {
                ...state,
                loading: false,
                success: false,
                payload: payload,
            };

        case GET_INFO_ERROR:
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
