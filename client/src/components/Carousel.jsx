import {React  , useEffect, useRef, useState} from 'react'
import { BrowserRouter as Router , Redirect , Route , Link} from 'react-router-dom'
import '../css/Carousel.css'
import { changePrefernce, getMovie } from '../utils/HomePage.fns'
import Target from './Target'
import store from '../app/store.js'
import { setBigMovies } from '../features/moviesSlice'
import axios from 'axios'

function Carousel({genre , movies , scroll }) {

    //track the extremes 
    const  [rightExt , setRightExt] = useState(!scroll)
    const [leftExt , setLeftExt] = useState(true)
    const  [scrollLeft , setScrollLeft] = useState(0)
    const carouselTrack = useRef(null)
    
    //redirect properly mkc 
    const [redirect, setDirect ] = useState(false)
    const  [id ,setId] = useState(null)
    const [clickedMovie , setClickedMovie] = useState(null)

    const rightObserver = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting === true) {
            setRightExt(true)
        } 
    } , {threshold : [0.5]})

    const leftObserver = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting === true) {
            setLeftExt(true)
        }
    } , {threshold : [0.5]})

    //move aage 
    const moveForward =  (e) => {
        rightObserver.observe(carouselTrack.current.lastChild)
        setLeftExt(false)
        carouselTrack.current.scrollLeft += 2*carouselTrack.current.children[0].getBoundingClientRect().width
    }
    
    //move pichu
    const moveBackward = (e) => {
        leftObserver.observe(carouselTrack.current.children[0])
        setRightExt(false)
        carouselTrack.current.scrollLeft -= 2*carouselTrack.current.children[0].getBoundingClientRect().width
    }

    //imageClick 
    const imgClick = async (e) => {
        e.preventDefault()
        changePrefernce(JSON.parse(e.target.attributes.state.value).title)
        setClickedMovie(JSON.parse(e.target.attributes.state.value))
        setDirect(true)
    } 

    // useEffect(() => {
    //     console.log(clickedMovie)
    // },[clickedMovie])
    
    return (
        redirect ? (
    
            // <Target movie = {movie}/> 
            <Redirect from = "/home" push to = {{pathname : `/title/${clickedMovie.titleId}` , state : clickedMovie , target : false }} />
        ) : (
            <div className = "carousel">
                <div className="carousel_cover">
                    {/* title */}
                    <div className="carousel_cover__title">
                        {genre}
                    </div>
                    {/* track */}
                    <div className ="carousel_track_div">
                        {
                            (!rightExt && !leftExt) ? (
                                <>
                                    <div className="right_overlay"></div>
                                    <div className="left_overlay"></div>
                                </>
                            ) : (
                                leftExt ? (
                                    <div className="right_overlay"></div>
                                    ) : (
                                    <div className="left_overlay"></div>
                                ) 
                            )
                        }
                        <div style = {{visibility : leftExt ? "hidden" : "visible"}} role = "button" onClick = {moveBackward} className="prev">{`ᐸ`}</div>
                        <ul ref = {carouselTrack} className = "carousel_track">
                            {
                                movies && JSON.parse(movies).map(movie => (
                                    <li>
                                        <img state = {JSON.stringify(movie)} role = "button" onClick = {e => imgClick(e)} src = {movie.poster} /> 
                                    </li>
                                ))
                            }
                        </ul>
                        <div style = {{visibility :  rightExt ? "hidden" : "visible"}} onClick = {moveForward} role ="button" className="after">{`ᐳ`}</div>
                    </div>
                </div>
            </div>
        )
    )
}

export default Carousel


{
    /*
    <div className = "right_overlay"></div>
                    <div className="left_overlay"></div>
                    <div className="carousel_track_cover">
                        <button onClick = {e => moveBackward(e)}className = "back">
                            {`<`}
                        </button>
                        <ul className="carousel_track" ref = {carouselTrack}>
                            <li>
                                <img src = "https://occ-0-3241-2164.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABYYm8blDwaX2rdTtXT_lKdFpVsiXaxXGCs2FNb1UeMZG_9dhKRvbaiTsuOdUhvEjZLOtNaLhncsU7E4Cdj-0nWtP5xQ.jpg?r=1ba" /> 
                            </li>
                            <li>
                                <img src = "https://occ-0-3241-2164.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABTmFvAh_jcCzFYnOu5KfcgowpiGrA0dYY6Ld5SWAlCtkFCSo1tjCwHHxfiFa_uHlZu4vdnjslGUcsApHA9ijDrAgbBA.jpg?r=0ca" />
                            </li>
                            <li>
                                <img src="https://occ-0-3241-2164.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABWYvSd57jZwpPUYLeBjv-IDEbTNa-zK8nLWKt3z7ptIqCllZ1Fn4VN_CVI4SZ1yYNl1EAhC-6MpdU6mm9T8MnfEZACI.jpg?r=3b9" alt="" />
                            </li>
                            <li>
                                <img src="https://occ-0-3241-2164.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABdUBFp3aqzQgg5ajPUQs6WHz_tIWzgDaMSG60Ao1xVXPe-__oAmlksDb0W7pcx_XdSC0xZZ-EBOL0wqWUhoVHfdaa14.jpg?r=b4e" alt="" />
                            </li>
                            <li>
                                <img src = "https://occ-0-3241-2164.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABTmFvAh_jcCzFYnOu5KfcgowpiGrA0dYY6Ld5SWAlCtkFCSo1tjCwHHxfiFa_uHlZu4vdnjslGUcsApHA9ijDrAgbBA.jpg?r=0ca" />
                            </li>
                            <li>
                                <img src="https://occ-0-3241-2164.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABWYvSd57jZwpPUYLeBjv-IDEbTNa-zK8nLWKt3z7ptIqCllZ1Fn4VN_CVI4SZ1yYNl1EAhC-6MpdU6mm9T8MnfEZACI.jpg?r=3b9" alt="" />
                            </li>
                            <li>
                                <img src="https://occ-0-3241-2164.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABdUBFp3aqzQgg5ajPUQs6WHz_tIWzgDaMSG60Ao1xVXPe-__oAmlksDb0W7pcx_XdSC0xZZ-EBOL0wqWUhoVHfdaa14.jpg?r=b4e" alt="" />
                            </li>
                        </ul>
                        <button onClick = {e => moveForward(e)} className = "next">
                            {`>`}
                        </button>
                    </div>
    */
}
