import React, { forwardRef, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import netflixlogo from '../images/netflix-logo.png'
import SearchIcon from '@mui/icons-material/Search';
import {IconButton, ListItemIcon, Menu, MenuItem} from '@mui/material'
import NotificationsIcon from '@mui/icons-material/Notifications';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';
import '../css/HomePage.css'
import {useDispatch} from 'react-redux'
import store from '../app/store'
import backIcon from '../images/back-icon.png'
import forwardIcon from '../images/forward-icon.png'
import {getMovies, getUser} from '../utils/HomePage.fns.js'
import Slide from '../components/Slide.jsx'
import '../css/Slide.css'
import Movies from '../components/Movies.jsx'
import { getGenreData } from '../utils/HomePage.fns.js';
import { setLogout } from '../features/userSlice';
import Logout from '@mui/icons-material/Logout';
import {useHistory} from 'react-router-dom'

function HomePage() { 


    // if(document.cookie.split(";").length < 2) {
    //     return
    // }
    const history = useHistory()
    const [bigMovies , setBigMovies] = useState([])
    const [i, setI] = useState(0)
    const [allMovies , setAllMovies] = useState([])

    const expand = () => {
        let input = document.getElementsByClassName("search_box_input")
        if(input[0].classList.length === 2) {
            input[0].classList.remove("search_box_input_select")
        }
        else {
            input[0].classList.add("search_box_input_select")
        }
    }

    const moveForward = () => {
        setI((i+1)%5) 
    }

    const moveBackward = () => {
        setI((i-1)%5)
    }

    const goToSlide = (e) => {
        setI(e.target.id)
    }

    const handleLogout = () => {
        store.dispatch(setLogout())
        document.cookie ='_ga=; Max-Age=-99999' 
        history.push('/')
    }

    useEffect(() => {
        async function getAllMovies() {
            const movies = await getGenreData()
            setAllMovies(movies)
        }
        async function getKarneWala() {
            await getUser()
            setBigMovies(store.getState().movieReducer.bigSliderMovies)
        }
        getKarneWala()
        // console.log("Runs again and again")
        getAllMovies()
    }, [])
    
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
        <div className = "home_page" style = {{width : "100%", height : "100%" ,  display : "flex" , flexDirection  : "column", overflowX : 'hidden' , position : 'relative' }}>
            <div className = "header" style = {{position : "absolute" , width : "100%" , height : "62px", backgroundColor : "transparent" ,  display  : "flex" , alignItems : "center" , zIndex: 1}}>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    bgcolor : '#181818' , 
                    color : "#fff" , 
                    '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                    },
                    '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: '#181818',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                    },
                },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem>
                Hello {store.getState().userReducer.username} !
                </MenuItem>
                <MenuItem>
                <ListItemIcon onClick = {handleLogout}>
                    <Logout color = "primary" fontSize="small" />
                </ListItemIcon>
                Logout
                </MenuItem>
            </Menu>
                <div className = "header_netflix_logo" style = {{width : "fit-content" , margin : "0 40px 0 40px", cursor : "pointer" , height : "100%" , display : "flex" , order  : 1 , justifyContent : "flex-start"}}>
                    <img src = {netflixlogo} style = {{width : "100%" , height : "100%" , objectFit : "contain"}} /> 
                </div>
                <div className = "header_categories" style = {{width : "50%" , order : 2}}>
                    <span className = "header_categories_item">Movies</span>
                    <span className = "header_categories_item">TV Shows</span>
                    <span className = "header_categories_item">Recently Added</span>
                    <span className = "header_categories_item">My List</span>
                </div>
                <div className = "header_types" style = {{order : 3 , display : "flex" , width : "40%" , alignItems : "center"}}>
                    <div className = "header_types_cover">
                        <div className = "search_box">
                            <form style ={{display : "flex" , width : "100%"}}>
                                <input className = "search_box_input" />
                                <IconButton onClick = {expand}>
                                    <SearchIcon style = {{color : "rgba(180,180,180)"}} /> 
                                </IconButton>
                            </form>
                        </div>  
                        <div style = {{order : 2}}>KIDS</div>
                        <div style = {{order : 3}}>DVD</div>
                        <div className = "header_notification" style = {{order : 4}}>
                            <IconButton>
                                <NotificationsIcon style = {{color : 'rgba(180,180,180)'}} /> 
                            </IconButton>
                        </div>
                        <div onClick = {handleClick} className="profile_div">
                            <img src = "data:image/jpeg;base64,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" className = "profile_icon" /> 
                        </div>
                    </div>
                </div>  
            </div>
            {/*Big Slider*/}
            <div className="image_slider_container">
                <div className="overlay"></div> 
                <div className="image_slider_container__bnf">
                    <div className="bnf-relative">
                        <div role = "button" onClick = {moveBackward} className = "image_slider_container__bnf--back">
                            <img src = {backIcon} /> 
                        </div>
                        <div role = "button" onClick = {moveForward} className="image_slider_container__bnf--next">
                            <img src = {forwardIcon} /> 
                        </div>
                    </div>
                </div>
                <div className = "image_slider_container__slider_dots" >
                    {bigMovies.length && bigMovies.slice(0,5).map((movie,index) => (
                        <div id = {index} onClick = {e => goToSlide(e)} className = {Math.abs(i) === index ? "dot current-dot" : "dot"}>.</div>
                    ))}
                </div>
                <div className="image_slider_container__body">
                    <ul className = "image_slider_container__track">
                        {bigMovies.length && bigMovies.slice(0,5).map((movie , index) => (
                            <li className = {Math.abs(i) === index ? "image_slide current-slide" : "image-slide"}>
                                <Slide 
                                bg = {movie.banner}
                                logo = {movie.logo} 
                                title = {movie.title} 
                                release  = {movie.releaseDate}
                                rating = {movie.rating}
                                genre = {movie.genre} 
                                desc = {movie.plot}
                                percent = {movie.match_percent}
                                /> 
                            </li>
                        ))}
                    </ul>
                </div>
            </div>            
            {/*Image Slider*/}
            <div className="movies">
                {allMovies && (
                    <Movies movies = {allMovies}/>
                )}
            </div>

        </div>
    )
}


export default HomePage


