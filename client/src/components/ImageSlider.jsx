import React from 'react'
import Carousel from './Carousel.jsx'
import '../css/ImageSlider.css'

function ImageSlider({title}) {
    return (
        <div style = {{margin : "5em 0"}}>
            <span className = "image_slider_title">{title}</span>
            <div className = "image_slider">
                <div className = "image_slider_cover">
                </div>
            </div>
        </div>
    )
}

export default ImageSlider
