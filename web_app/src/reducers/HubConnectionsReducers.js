
import {actions} from '../actions/HubConnectionsActions'

const HubConnections = (state = {}, action) => {
    switch (action.type) {
        case actions.ADD_CONNECTION:
            return Object.assign({}, state, action.connection)
        
        case actions.DELETE_CONNECTION:
            return {}

        default:
            return state;
    }
}

export default HubConnections