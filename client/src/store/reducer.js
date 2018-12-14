import { createBrowserHistory } from 'history'

const history = createBrowserHistory()

const initialState = {
    user : {
        username : null,
        password : null
    }
}

const reducer = (state = initialState, action) => {

    if (action.type === "CURRENT_USER") {
        // window.location.pathname = `/${action.user.username}/home`
        return {
            user : {
               ...state.user,
               username : action.user.username,
           }
       }
    }

    if (action.type === "REMOVE_USER") {
        return {
            user : action.user
        }
    }

    return state
}

export default reducer