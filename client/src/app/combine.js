import { combineReducers } from "redux";
import movieSlice from "../features/moviesSlice";
import userSlice from  '../features/userSlice'

export const rootReducer = combineReducers({
    movieReducer : movieSlice    , 
    userReducer : userSlice
})