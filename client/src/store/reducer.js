
const initialState = {
    user : {
        username : null,
        password : null
    },
    path : null,
    ball : {
        id : null,
        image : null
    },
    balls: []
}

const reducer = (state = initialState, action) => {

    if (action.type === "CURRENT_USER") {
        // window.location.pathname = `/${action.user.username}/home`
        return {
            ...state,
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

    if (action.type === "BALL_IMAGE") {
        return {
            ...state,
            ballImage : action.ballImage.ballImage[0].image
        }
    }

    if (action.type === "GRAB_BALLS") {
        return {
            ...state,
            balls : action.balls
        }
    }
    return state
}

export default reducer