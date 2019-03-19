import { actions } from '../actions/Users'

const Users = (state = {}, action) => {
    switch(action.type) {
        case actions.LOGIN:
            console.log(action)
            state = action.users
            return state;
        case actions.LOGIN_FAILED:
            return state;
        default:
            return state;
    }
}

export default Users;