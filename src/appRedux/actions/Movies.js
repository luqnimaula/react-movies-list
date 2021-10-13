import {
    MOVIES_LOADING,
    MOVIES_SEARCH,
    MOVIES_PAGE,
    MOVIES_DATA,
    MOVIES_TOTAL,
    MOVIES_DETAIL_LOADING,
    MOVIES_DETAIL_DATA,
} from "@constants/ActionTypes";
import axios from "@util/Api";
import {setError} from "@reduxActions";
import Config from '@config/Config';

const {BASE_API, API_KEY} = Config;

export const setLoading = (isLoading) =>
{
	return (dispatch) => dispatch({type: MOVIES_LOADING, payload: isLoading});
}

export const setDetailLoading = (isLoading) =>
{
	return (dispatch) => dispatch({type: MOVIES_DETAIL_LOADING, payload: isLoading});
}

export const resetDetail = () =>
{
	return (dispatch) => dispatch({type: MOVIES_DETAIL_DATA, payload: null});
}

export const getMovies = () =>
{
	return async (dispatch, getState) =>
	{
		const {movies} = getState();
		const {search, page, data: old_data, loading} = movies;

		if (!loading)
		{
			try {
				dispatch(setLoading(true));
				const request = await axios.get(BASE_API, {params: {apikey: API_KEY, s: search, page}});
				const {data} = request;
				const {Search: rows, totalResults: total_rows} = data ? data : {};
				dispatch({type: MOVIES_DATA, payload: [...new Set([...old_data, ...rows])]});
				dispatch({type: MOVIES_TOTAL, payload: !isNaN(total_rows) ? parseInt(total_rows) : 0});
			} catch(e) {
				dispatch(setError(e));
			} finally {
				dispatch(setLoading(false));
			}
		}
	};
}

export const loadMoreMovies = () =>
{
	return (dispatch, getState) =>
	{
		const {movies} = getState();
		const {loading, page, total} = movies;

		const startIndex = (page - 1) * 10 + 1;
		if (!loading && (total === 0 || startIndex < total))
		{
			dispatch({type: MOVIES_PAGE, payload: page + 1});
			dispatch(getMovies());
		}
	}
}

export const searchMovies = (value) =>
{
	return (dispatch) =>
	{
		dispatch({type: MOVIES_PAGE, payload: 1});
		dispatch({type: MOVIES_DATA, payload: []});
		dispatch({type: MOVIES_SEARCH, payload: value});
		if (value) dispatch(getMovies());
		else dispatch({type: MOVIES_TOTAL, payload: 0});
	};
}

export const getMovieDetail = (slug) =>
{
	return async (dispatch) =>
	{
		try {
			dispatch(setDetailLoading(true));
			const request = await axios.get(BASE_API, {params: {apikey: API_KEY, i: slug}});
			const {data} = request;
			dispatch({type: MOVIES_DETAIL_DATA, payload: data});
		} catch(e) {
			dispatch(setError(e));
		} finally {
			dispatch(setDetailLoading(false));
		}
	};
}