import {
    GET_BARCODE_REQUEST,
    GET_BARCODE_SUCCESS,
    GET_BARCODE_ERROR,
} from "../../types/types";
export default function barcodeDetails(state = "", action) {
    const { type, payload } = action;
    switch (type) {
        case GET_BARCODE_REQUEST:
            return {
                loading: true,
                success: true,
            };
        case GET_BARCODE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: false,
                payload: payload,
            };

        case GET_BARCODE_ERROR:
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
