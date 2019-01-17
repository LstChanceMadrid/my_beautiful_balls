
export const initialState = {
    user : {
        username : null,
        password : null
    },
    path : null,
    ball : {
        id : null,
        image : null,
        price : 3500
    },
    balls: [],
    cartItems : [],
    totalPrice : 100,
    quantity : 0
}

const reducer = (state = initialState, action) => {

    if (action.type === "CURRENT_USER") {
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

    if (action.type === "CART_ITEM") {
        
        return {
            ...state,
            cartItems : [...state.cartItems, action.cartItem]
        }
    }

    if (action.type === "QUANTITY") {
        return {
            ...state,
            quantity : action.quantity
        }
    }





    return state
}

export default reducer