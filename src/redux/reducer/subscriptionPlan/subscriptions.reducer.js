import {
    GET_SUBSCRIPTION_PLAN_REQUEST,
    GET_SUBSCRIPTION_PLAN_SUCCESS,
    GET_SUBSCRIPTION_PLAN_ERROR,
} from "../../types/types";
export default function getSubscriptionPlan(state = "", action) {
    const { type, payload } = action;
    switch (type) {
        case GET_SUBSCRIPTION_PLAN_REQUEST:
            return {
                loading: true,
                success: true,
            };
        case GET_SUBSCRIPTION_PLAN_SUCCESS:
            return {
                ...state,
                loading: false,
                success: false,
                payload: payload,
            };

        case GET_SUBSCRIPTION_PLAN_ERROR:
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
