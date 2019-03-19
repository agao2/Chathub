import {combineReducers} from 'redux'
import HubConnections from './HubConnections'
import Users from './Users'

export default combineReducers({
    HubConnections,
    Users
})