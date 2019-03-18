
import axios from 'axios'


export const actions = {
    LOGIN: "LOGIN",
    CREATE_USER: "CREATE USER",
    DELETE_USER: "DELETE USER",
    LOGIN_FAILED: "LOGIN FAILED"
};

// export const login = user = ({
//     type: actions.LOGIN,
//     user: user
// })

export const authenticate = async(user) => {
    return async(dispatch) => {
        try {
            let res = await axios.post('/api/Authentication',user);
            console.log(res);
            dispatch({type:actions.LOGIN , res})
            
        } catch (err) {
           dispatch({type: actions.LOGIN_FAILED})
        }
    }
}