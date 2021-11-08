import axios from '../axios.js'
import React , {useState} from 'react'
import '../css/Login.css'
import n from '../images/n_logo.png'
import { useHistory } from 'react-router-dom'

function LoginPage() {

    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const [username ,setUsername] = useState('')
    
    const history = useHistory()

    const register = async(e) => {
        e.preventDefault()
        axios.post('/user/register' ,  {
            email : email , 
            username : username , 
            password : password
        }).then(res => {
            history.push("/")
        }).catch(err => {
            alert(err.message)
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
                            <input value = {email} onChange ={e => setEmail(e.target.value)} type="text" className="form_email--input" />
                        </div>
                        <div className="form_email">
                            <span className="form_email--span">Username</span>
                            <input value = {username} onChange = {e => setUsername(e.target.value)} type="text" className="form_email--input" />
                        </div>
                        <div className="form_password">
                            <span className="form_password--span">Password</span>
                            <input value ={password} onChange= {e => setPassword(e.target.value)} type="password" className="form_password--input" />
                        </div>
                        <div className = "form_btn">
                            <button onClick = {e => register(e)} className="form_btn--login">REGISTER</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
