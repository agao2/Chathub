import {combineReducers} from 'redux'
import HubConnections from './HubConnectionsReducers'
import Users from './UsersReducers'

export default combineReducers({
    HubConnections,
    Users
})