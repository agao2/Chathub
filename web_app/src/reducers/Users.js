import { actions } from '../actions/Users'

const Users = (state = {}, action) => {
    switch(action.type) {
        case actions.LOGIN:
            state = Users
            return state;
        case actions.LOGIN_FAILED:
            return ;
        default:
            return state;
    }
}

export default Users;