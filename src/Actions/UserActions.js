export const loginUser = (dispatch, user) => {
    dispatch({
     type: 'LOGIN_USER',
     payload: user
    })
}

export const logoutUser = (dispatch) => {
    dispatch({
     type: 'LOGOUT_USER'
    })
}
