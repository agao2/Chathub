export const actions = {
    ADD_CONNECTION: "ADD CONNECTION",
    DELETE_CONNECTION:"DELETE CONNECTION"
}


export const addConnection = hubConnection => ({
    type: actions.ADD_CONNECTION, 
    connection: hubConnection
})

export const deleteConnection = hubConnection => ({
    type: actions.DELETE_CONNECTION, 
    connection: hubConnection
})