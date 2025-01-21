import {
    GET_CATEGORIES_REQUEST,
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_ERROR,
} from "../../types/types";
export default function getCategory(state = "", action) {
    const { type, payload } = action;
    switch (type) {
        case GET_CATEGORIES_REQUEST:
            return {
                loading: true,
                success: true,
            };
        case GET_CATEGORIES_SUCCESS:
            return {
                ...state,
                loading: false,
                success: false,
                payload: payload,
            };

        case GET_CATEGORIES_ERROR:
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
