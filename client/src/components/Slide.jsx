import React from 'react'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';

function Slide({bg, logo, title , release, rating, genre , desc , percent }) {
    return (
        <div className = "slide">
            
            {/*Bg Image*/}
            <img className =  "slide__bg" src = {bg} /> 
            {/* <img style =  {{height : "100%", objectPosition : "left top" , zIndex : "-1" , objectFit : "contain"}} className =  "slide__bg" src = "https://occ-0-3241-2164.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABd4eoielzKfx0Vrxi0Y9bCiW5dYIbZBF3Y-Txt1NrdjGZ3L_sva5z-FyZxFvUx4mncUHx4L7n2oxg3qNnD91NhdoK6QQ.jpg?r=775" />  */}
            {/* Logo */}
            <img className = "slide__logo" src =  {logo} /> 
            {/* Title */}
            <span className = "slide__title">{title}</span>
            {/* Btns */}
            <div className="slide__btns">
              <div className = "slide__btns slide__btn play">
                    <PlayArrowIcon /> 
                    <span>Play</span>
                </div>
                <div className="slide__btns slide__btn mylist">
                    <AddIcon />
                    <span>My List</span> 
                </div>
            </div>
            {/* Desc */}
            <div className="slide__desc">
                <span className = "slide__desc__release">{release}</span>
                <span className = "spacer">|</span>
                <span className = "slide__desc__rating">{rating}</span>
                <span className = "spacer">|</span>
                <span className = "slide__desc__genre">{genre}</span>
                <span className = "spacer">|</span>
                <span className = "slide__desc__percent">{percent ? `${percent}%` : ``} </span>
                <span className="percent" style = {{fontFamily : "sans-serif" , margin : "0 0 0 8px" , fontWeight : "400" , color : "greenyellow"}}>{percent ? 'match' : ''}</span>
            </div>
            {/* plot */}
            <div className = "slide__plot">{desc}</div>
        </div>
    )
}

export default Slide
