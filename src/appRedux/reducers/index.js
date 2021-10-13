import {combineReducers} from "redux";
import {connectRouter} from 'connected-react-router';
import Common from "./Common";
import Movies from "./Movies";

export default (history) => combineReducers({
    router: connectRouter(history),
    commonData: Common,
    movies: Movies
});