import { actions } from '../actions/UsersActions'

const Users = (state = {}, action) => {
    switch (action.type) {
        case actions.LOGIN:
            return Object.assign({}, state, action.user.data)
        case actions.LOGIN_FAILED:
            return null;
        case actions.GET_USER:
            return state;
        default:
            return state;
    }
}

export default Users;