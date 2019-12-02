
import axios from 'axios'


export const actions = {
    LOGIN: "LOGIN",
    CREATE_USER: "CREATE USER",
    DELETE_USER: "DELETE USER",
    LOGIN_FAILED: "LOGIN FAILED",
    GET_USER: "GET USER"
};


export const authenticate = (user) => {
    return async (dispatch) => {
        try {
            const res = await axios.post('/api/users/login', user);
            return dispatch({ type: actions.LOGIN, user: res })
        } catch (err) {
            return dispatch({ type: actions.LOGIN_FAILED, user: {} })
        }
    }
}

export const getUser = () => {
    return (dispatch) => {
        return dispatch({ type: actions.GET_USER })
    }
}