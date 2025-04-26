import {
    GET_PRODUCT_TYPE_REQUEST,
    GET_PRODUCT_TYPE_SUCCESS,
    GET_PRODUCT_TYPE_ERROR
} from "../../types/types";
export default function getShopifyType(state = "", action) {
    const { type, payload } = action;
    switch (type) {
        case GET_PRODUCT_TYPE_REQUEST:
            return {
                loading: true,
                success: true,
            };
        case GET_PRODUCT_TYPE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: false,
                payload: payload,
            };

        case GET_PRODUCT_TYPE_ERROR:
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
