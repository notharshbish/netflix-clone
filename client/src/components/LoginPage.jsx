import React, { useEffect, useState } from 'react'
import '../css/Login.css'
import n from '../images/n_logo.png'
import axios from '../axios.js'
import {useHistory} from 'react-router-dom'
import store from '../app/store.js'

function LoginPage() {

    const history = useHistory()
    const [email , setEmail ] = useState('')
    const [password , setPassword] = useState('')

    if(store.getState().userReducer.uId) { 
        history.push('/home')
    }

    const login = async (e) => {
        e.preventDefault()
        axios.post('/user/login' , {
            email : email , 
            password : password
        }).then(res => {
            history.push('/home')
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div className = "login_page">
            <div className="login_page_cover">
                <div className="form_div">
                    <div className="logo">
                        <img src = {n} /> 
                    </div>
                    <form className = "login_form">
                        <div className="form_email">
                            <span className="form_email--span">Email Id</span>
                            <input value = {email} onChange = {e => setEmail(e.target.value)} type="text" className="form_email--input" />
                        </div>
                        <div className="form_password">
                            <span className="form_password--span">Password</span>
                            <input value = {password} onChange = {e => setPassword(e.target.value)} type="password" className="form_password--input" />
                        </div>
                        <div className = "form_btn">
                            <button onClick = {e => login(e)} className="form_btn--login">LOGIN</button>
                        </div>
                    </form>
                    <div style = {{display : "flex" , justifyContent : "center"}}>
                        <a href="/register" style = {{color : "#e50914" }}>Register here</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
