
import axios from 'axios'
import setAuthenticationToken from '../utils'

const REGISTER_URL = "http://localhost:5000/api/register"
const LOGIN_URL = 'http://localhost:5000/api/login'

export const currentUser = (user) => {
    return {
        type : "CURRENT_USER",
        user
    }
}

export const removeUser = (user) => {
    return {
        type : "REMOVE_USER",
        user
    }
}

export const registerUser = () => {

    return dispatch => {
        axios.post(REGISTER_URL, {
            username : localStorage.username,
            firstname : localStorage.firstname ,
            lastname : localStorage.lastname ,
            email : localStorage.email ,
            password : localStorage.password 
        }).then(response => {
            if (response.data.success === true) {
                localStorage.removeItem('firstname')
                localStorage.removeItem('lastname')
                localStorage.removeItem('email')
                dispatch(authenticateLogin())
            }
        })
    }
}


export const authenticateLogin = () => {
    localStorage.removeItem('jsonwebtoken')


    return dispatch => {
        
        axios.post(LOGIN_URL, {
            username : localStorage.getItem('username'),
            password : localStorage.getItem('password')
        }).then(response => {
            if (response.data.token !== undefined) {
        
                localStorage.removeItem('password')
                localStorage.setItem('jsonwebtoken', response.data.token)
            

                setAuthenticationToken(response.data.token)

                let user = {username : localStorage.getItem('username')}
                
                dispatch(currentUser(user))
            } else {
                delete axios.defaults.headers.common['Authorization']
                localStorage.removeItem('username')
                localStorage.removeItem('password')
            }
        })
    }
}

export const logout = () => {
    delete localStorage.jsonwebtoken
    delete localStorage.username
    delete localStorage.password
    return dispatch => {
        let user = {}
        dispatch(removeUser(user))
    }
}