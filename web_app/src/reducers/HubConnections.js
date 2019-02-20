
const HubConnections = (state = [], action) => {
    switch (action.type) {
        case 'ADD CONNECTION':
            return state.push(action.connection);

        case 'DELETE CONNECTION':
            let newState = state;
            let index = newState.indexOf(action.connection)
            if (index > -1) {
                newState.splice(index, 1)
            }
            return newState;

        default:
            return state;
    }
}

export default HubConnections