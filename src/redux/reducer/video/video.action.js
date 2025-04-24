import {
    VIDEO_SEARCH_REQUEST,
    VIDEO_SEARCH_SUCCESS,
    VIDEO_SEARCH_ERROR,
} from "../../types/types";
export default function getVideos(state = "", action) {
    const { type, payload } = action;
    switch (type) {
        case VIDEO_SEARCH_REQUEST:
            return {
                loading: true,
                success: true,
            };
        case VIDEO_SEARCH_SUCCESS:
            return {
                ...state,
                loading: false,
                success: false,
                payload: payload,
            };

        case VIDEO_SEARCH_ERROR:
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
