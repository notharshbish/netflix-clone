const initialState = {
    bigSliderMovies : [] , 
    currentMovie : null
}


const movieSlice = (state = initialState , action) => {
    switch(action.type) {
        case 'UPDATED_SLIDER_MOVIES' : 
            return {
                ...state.bigSliderMovies , 
                bigSliderMovies : action.payload
            }

        case 'UPDATED_CURRENT_MOVIE'  : 
            return {
                ...state.currentMovie , 
                currentMovie : action.payload
            }

        default :
            return state
    }
}


export const setBigMovies = (movies) => {
    return {
        type :  'UPDATED_SLIDER_MOVIES' , 
        payload : movies
    }
}

export const setCurrentMovie = (movie)  => {
    return {
        type : 'UPDATED_CURRENT_MOVIE'  , 
        payload :  movie
    }
}


export default movieSlice