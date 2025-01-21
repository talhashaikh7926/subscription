import {
    GET_CONFIGURATION_REQUEST,
    GET_CONFIGURATION_SUCCESS,
    GET_CONFIGURATION_ERROR,
} from "../../types/types";
export default function getConfiguration(state = "", action) {
    const { type, payload } = action;
    switch (type) {
        case GET_CONFIGURATION_REQUEST:
            return {
                loading: true,
                success: true,
            };
        case GET_CONFIGURATION_SUCCESS:
            return {
                ...state,
                loading: false,
                success: false,
                payload: payload,
            };

        case GET_CONFIGURATION_ERROR:
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
