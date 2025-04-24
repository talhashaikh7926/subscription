import {
    FAQ_SEARCH_REQUEST,
    FAQ_SEARCH_SUCCESS,
    FAQ_SEARCH_ERROR,
} from "../../types/types";
export default function getFaq(state = "", action) {
    const { type, payload } = action;
    switch (type) {
        case FAQ_SEARCH_REQUEST:
            return {
                loading: true,
                success: true,
            };
        case FAQ_SEARCH_SUCCESS:
            return {
                ...state,
                loading: false,
                success: false,
                payload: payload,
            };

        case FAQ_SEARCH_ERROR:
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
