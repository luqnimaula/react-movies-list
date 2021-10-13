import {
    MOVIES_LOADING,
    MOVIES_SEARCH,
    MOVIES_PAGE,
    MOVIES_DATA,
    MOVIES_TOTAL,
    MOVIES_DETAIL_LOADING,
    MOVIES_DETAIL_DATA,
} from "@constants/ActionTypes";

const INIT_STATE = {
    loading: false,
    search: null,
    page: 1,
    data: [],
    total: 0,
    detail_loading: false,
    detail_data: null
};

export default (state = INIT_STATE, action) =>
{
    switch (action.type)
    {
        case MOVIES_LOADING: {
            return {...state, loading: action.payload ? true : false};
        }

        case MOVIES_SEARCH: {
            return {...state, search: action.payload};
        }

        case MOVIES_PAGE: {
            return {...state, page: action.payload};
        }

        case MOVIES_DATA: {
            return {...state, data: action.payload};
        }

        case MOVIES_TOTAL: {
            return {...state, total: !isNaN(action.payload) ? parseInt(action.payload) : 0};
        }

        case MOVIES_DETAIL_LOADING: {
            return {...state, detail_loading: action.payload ? true : false};
        }

        case MOVIES_DETAIL_DATA: {
            return {...state, detail_data: action.payload};
        }

        default:
            return state;
    }
}