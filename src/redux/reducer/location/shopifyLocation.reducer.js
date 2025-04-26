import {
    GET_SHOPIFY_LOCATIONS_REQUEST,
    GET_SHOPIFY_LOCATIONS_SUCCESS,
    GET_SHOPIFY_LOCATIONS_ERROR,
} from "../../types/types";
export default function Shopifylocation(state = "", action) {
    const { type, payload } = action;
    switch (type) {
        case GET_SHOPIFY_LOCATIONS_REQUEST:
            return {
                loading: true,
                success: true,
            };
        case GET_SHOPIFY_LOCATIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                success: false,
                payload: payload,
            };

        case GET_SHOPIFY_LOCATIONS_ERROR:
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
