import {
    SUBSCRIPTION_SEARCH_REQUEST,
    SUBSCRIPTION_SEARCH_SUCCESS,
    SUBSCRIPTION_SEARCH_ERROR,

} from "../../types/types";
export default function getSubscriptionData(state = "", action) {
    const { type, payload } = action;
    switch (type) {
        case SUBSCRIPTION_SEARCH_REQUEST:
            return {
                loading: true,
                success: true,
            };
        case SUBSCRIPTION_SEARCH_SUCCESS:
            return {
                ...state,
                loading: false,
                success: false,
                payload: payload,
            };

        case SUBSCRIPTION_SEARCH_ERROR:
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
