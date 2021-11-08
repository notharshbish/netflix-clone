import React from 'react'
import Carousel from './Carousel.jsx'

function Movies({movies}) {
    return (
        <div style = {{position : "relative" , width : "100%" ,  height : "fit-content" ,display : "flex" , flexDirection : 'column' }}>
            {
                movies?.map(movie => (
                    <Carousel genre = {movie.genre} movies = {movie.movies} scroll = {JSON.parse(movie.movies).length > 3 ? true : false}/>  
                ))
            }         
        </div>
    )
}

export default Movies
