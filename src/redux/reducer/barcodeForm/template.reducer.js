import {
    GET_TEMPLATE_REQUEST,
    GET_TEMPLATE_SUCCESS,
    GET_TEMPLATE_ERROR,
} from "../../types/types";
export default function templates(state = "", action) {
    const { type, payload } = action;
    switch (type) {
        case GET_TEMPLATE_REQUEST:
            return {
                loading: true,
                success: true,
            };
        case GET_TEMPLATE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: false,
                payload: payload,
            };

        case GET_TEMPLATE_ERROR:
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
